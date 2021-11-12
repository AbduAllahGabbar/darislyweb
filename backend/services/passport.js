var passport = require("passport");
const {
  Student,
  Tutor,
  Staff,
  AuthenticationProvider,
  Admin,
  sequelize,
} = require("../models");
const AuthProviderTypes = require("../enums").AuthProviderTypes;
const UserRoles = require("../enums").UserRoles;
const bcrypt = require("bcryptjs");
const errors = require("../utils/errors");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const createUser = async (
  Model,
  user,
  profileId,
  authProvider,
  transaction
) => {
  const userResult = await Model.create(user, { transaction });

  await userResult.createAuthenticationProviders(
    { id: profileId, type: authProvider },
    { transaction }
  );

  return userResult;
};

passport.serializeUser((user, done) => {
  let role;
  switch (user.constructor.name) {
    case "Student":
      role = UserRoles.STUDENT;
      break;
    case "Tutor":
      role = UserRoles.TUTOR;
      break;
    case "Staff":
      role = UserRoles.STAFF;
      break;
    case "Admin":
      role = UserRoles.ADMIN;
      break;
    default:
      role = UserRoles.NOUSER;
  }

  done(null, { id: user.id, lang: user.dataValues.lang, role: role });
});

passport.deserializeUser(async (serializedUser, done) => {
  const { id, lang, role } = serializedUser;

  let user;

  switch (role) {
    case UserRoles.STUDENT: {
      user = await Student.findByPk(id, {
        attributes: { exclude: ["password", "createdAt"] },
      });
      break;
    }
    case UserRoles.TUTOR: {
      user = await Tutor.findByPk(id, {
        attributes: { exclude: ["password", "createdAt"] },
      });
      break;
    }
    case UserRoles.STAFF: {
      user = await Staff.findByPk(id, {
        attributes: { exclude: ["password", "createdAt"] },
      });
      break;
    }
    case UserRoles.ADMIN: {
      user = await Admin.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      break;
    }
  }

  if (user) {
    user.setDataValue("role", role);
    user.setDataValue("lang", lang);
  }

  done(null, user);
});

const createPassportLocalLoginStrategy = (Model) => {
  return new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, id, password, done) => {
      try {
        const user = await Model.findOne({ where: { email: id } });

        const hispas = await bcrypt.hash(req.body.password, 10);

        if (user) {
          if (user.constructor.name === "Student") {
            let authProvider = await user.getAuthenticationProviders();

            if (authProvider) {
              done(
                {
                  name: "AuthorizationError",
                  body: {
                    msg: errors.password.useSocialAccount,
                    param: "password",
                    location: "body",
                  },
                },
                false
              );
            }
          }

          const isMatch = await bcrypt.compare(
            password,
            user.password.toString()
          );

          if (isMatch) {
            user.setDataValue("lang", req.params.lang);
            done(null, user);
          } else {
            done(
              {
                name: "AuthorizationError",
                body: {
                  msg: errors.password.wrong,
                  param: "password",
                  location: "body",
                },
              },
              false
            );
          }
        } else {
          done(
            {
              name: "AuthorizationError",
              body: {
                msg: errors.email.notExists,
                param: "email",
                location: "body",
              },
            },
            false
          );
        }
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  );
};

const createPassportStaffLoginStrategy = () => {
  return new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, id, password, done) => {
      try {
        const user = await Staff.findOne({ where: { username: id } });

        if (user) {
          const isMatch = await bcrypt.compare(
            password,
            user.password.toString()
          );

          if (isMatch) {
            user.setDataValue("lang", req.params.lang);
            done(null, user);
          } else {
            done(
              {
                name: "AuthorizationError",
                body: {
                  msg: errors.password.wrong,
                  param: "password",
                  location: "body",
                },
              },
              false
            );
          }
        } else {
          done(
            {
              name: "AuthorizationError",
              body: {
                msg: errors.username.notExists,
                param: "username",
                location: "body",
              },
            },
            false
          );
        }
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  );
};

const createPassportLocalRegisterStrategy = (Model) => {
  return new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "phone",
      passReqToCallback: true,
    },
    async (req, email, phone, done) => {
      const transaction = await sequelize.transaction();

      try {
        let user;

        if (req.user) {
          await Model.destroy({
            where: {
              email: req.body.email,
              phone: req.body.phone,
              countryCode: req.body.countryCode,
            },
            transaction,
          });

          req.user.firstName = req.body.firstName;
          req.user.lastName = req.body.lastName;
          if (!req.user.email) req.user.email = req.body.email;
          req.user.phone = req.body.phone;
          req.user.countryCode = req.body.countryCode;
          req.user.country = req.body.country;
          req.user.phoneVerified = 1;
          user = await req.user.save({ transaction });
        } else {
          user = await Model.findOne({
            where: {
              email: req.body.email,
              emailVerified: 1,
            },
            transaction,
          });

          if (user) {
            await transaction.commit();

            return done(
              {
                name: "ArgumentError",
                body: {
                  msg: errors.email.exists,
                  param: "email",
                  location: "body",
                },
              },
              false
            );
          }

          user = await Model.findOne({
            where: {
              email: req.body.email,
              phone: req.body.phone,
              countryCode: req.body.countryCode,
            },
            transaction,
          });

          req.body.password = await bcrypt.hash(req.body.password, 10);

          if (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = req.body.password;
            // if (req.body.password) user.password = req.body.password;
            user = await user.save({ transaction });
          } else {
            user = await Model.create(req.body, { transaction });
          }
        }

        await transaction.commit();

        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        user.setDataValue("lang", req.params.lang);
        done(null, user);
      } catch (err) {
        console.log(err);
        await transaction.rollback();
        done(err, false);
      }
    }
  );
};

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/v1/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const transaction = await sequelize.transaction();

    try {
      let existingUser = await Student.findOne({
        where: { email: profile.emails[0].value },
        attributes: { exclude: ["password"] },
        transaction,
      });

      if (existingUser && existingUser.emailVerified) {
        let authProvider = await existingUser.getAuthenticationProviders({
          transaction,
        });
        if (!authProvider) {
          await existingUser.createAuthenticationProviders(
            { id: profile.id, type: AuthProviderTypes.GOOGLE },
            { transaction }
          );
        }
        await transaction.commit();

        return done(null, existingUser);
      }

      const user = {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        emailVerified: 1,
      };

      const student = await createUser(
        Student,
        user,
        profile.id,
        AuthProviderTypes.GOOGLE,
        transaction
      );

      await transaction.commit();

      done(null, student);
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      done(err, false);
    }
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/v1/auth/facebook/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await AuthenticationProvider.findOne({
        where: {
          id: profile.id,
          type: AuthProviderTypes.FACEBOOK,
        },
        include: {
          model: Student,
          attributes: { exclude: ["password"] },
        },
      });

      if (existingUser) {
        return done(null, existingUser.Student);
      }

      const name = profile.displayName.split(" ");

      const user = {
        firstName: name[0].trim(),
        lastName: name[1].trim(),
      };

      const student = await createUser(
        Student,
        user,
        profile.id,
        AuthProviderTypes.FACEBOOK
      );

      done(null, student);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
);

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/v1/auth/twitter/callback",
  },
  async (token, tokenSecret, profile, done) => {
    try {
      let existingUser = await AuthenticationProvider.findOne({
        where: {
          id: profile.id,
          type: AuthProviderTypes.TWITTER,
        },
        include: {
          model: Student,
          attributes: { exclude: ["password"] },
        },
      });

      if (existingUser) {
        return done(null, existingUser.Student);
      }

      const name = profile.displayName.split(" ");

      const user = {
        firstName: name[0].trim(),
        lastName: name[1].trim(),
      };

      const student = await createUser(
        Student,
        user,
        profile.id,
        AuthProviderTypes.TWITTER
      );
      done(null, student);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
);

const createPassportAdminLocalLoginStrategy = (Model) => {
  return new LocalStrategy({}, async (username, password, done) => {
    try {
      const user = await Admin.findOne({ where: { username } });
      if (user) {
        const isMatch = await bcrypt.compare(
          password,
          user.password.toString()
        );

        if (isMatch) {
          done(null, user);
        } else {
          done(
            {
              name: "AuthorizationError",
              body: {
                msg: errors.password.wrong,
                param: "password",
                location: "body",
              },
            },
            false
          );
        }
      } else {
        done(
          {
            name: "AuthorizationError",
            body: {
              msg: "Username does not exist",
              param: "email",
              location: "body",
            },
          },
          false
        );
      }
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  });
};

passport.use("localLoginStudent", createPassportLocalLoginStrategy(Student));
passport.use("localLoginTutor", createPassportLocalLoginStrategy(Tutor));
passport.use("localLoginStaff", createPassportStaffLoginStrategy());
passport.use("localLoginAdmin", createPassportAdminLocalLoginStrategy());
passport.use(
  "localRegisterStudent",
  createPassportLocalRegisterStrategy(Student)
);

passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(twitterStrategy);
