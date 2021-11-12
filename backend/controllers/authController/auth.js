const path = require("path");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const UserRoles = require("../../enums").UserRoles;
const twilioVerify = require("../../services/twilio").verify;
const errors = require("../../utils/errors");
const crypto = require("crypto-random-string");
const bcrypt = require("bcryptjs");
const {
  Student,
  Tutor,
  LastVerificationTime,
  EmailVerification,
} = require("../../models");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../emailController/email");
const { Op } = require("sequelize");
const sequelize = require("../../models/index").sequelize;

const { emailVerificationLink } = require("../../utils/constants");

const handleLastVerificationTime = async (userId, type) => {
  if (type != "sms" && type != "email")
    throw new Error("Invalid type specified");

  const lastVerificationTimeObject = await LastVerificationTime.findOne({
    where: {
      studentId: userId,
    },
  });

  let lastVerificationTime;

  if (lastVerificationTimeObject) {
    lastVerificationTime =
      type === "sms"
        ? lastVerificationTimeObject.lastPhoneVerification
        : lastVerificationTimeObject.lastEmailVerification;
  }

  if (lastVerificationTime) {
    const lastVerificationTimeDate = new Date(lastVerificationTime);

    const timeDifference = Math.abs(Date.now() - lastVerificationTimeDate);

    const timeDifferenceInMinutes = timeDifference / 1000 / 60;

    if (timeDifferenceInMinutes < 5) {
      throw new Error(
        `You need to wait 5 minutes before attempting to request a ${
          type === "sms" ? "phone" : "email"
        } verification again, last requested at: ${lastVerificationTime}`
      );
    }
  }

  await LastVerificationTime.create(
    {
      studentId: userId,
      ...(type === "sms" && { lastPhoneVerification: Date.now() }),
      ...(type === "email" && { lastEmailVerification: Date.now() }),
    },
    {
      updateOnDuplicate:
        type === "sms"
          ? ["last_phone_verification"]
          : ["last_email_verification"],
    }
  );
};

const sendSMSVerification = async (phone) => {
  try {
    // await handleLastVerificationTime(userId, "sms");

    const verificationRequest = await twilioVerify.verifications.create({
      to: phone,
      channel: "sms",
    });
  } catch (e) {
    console.log(e);
    if (e.status == 400) {
      throw {
        name: "ArgumentError",
        body: {
          msg: errors.phone.invalid,
          param: "phone",
          location: "body",
        },
      };
    } else {
      throw {
        name: "TwilioError",
      };
    }
  }
};

exports.signInStudent = catchAsync(async (req, res, next) => {
  const student = req.user.dataValues;
  student.password = undefined;
  student.resetPasswordExpires = undefined;
  student.resetPasswordToken = undefined;
  res.send({
    ...student,
    role: UserRoles.STUDENT,
  });
});

exports.signInTutor = catchAsync(async (req, res, next) => {
  const tutor = req.user.dataValues;
  tutor.password = undefined;
  tutor.resetPasswordExpires = undefined;
  tutor.resetPasswordToken = undefined;
  res.send({ ...tutor, role: UserRoles.TUTOR });
});

exports.signInStaff = catchAsync(async (req, res, next) => {
  const staff = req.user.dataValues;
  staff.password = undefined;
  staff.resetPasswordExpires = undefined;
  staff.resetPasswordToken = undefined;
  res.send({ ...staff, role: UserRoles.STAFF });
});

exports.signInAdmin = catchAsync(async (req, res, next) => {
  const admin = req.user.dataValues;
  admin.password = undefined;
  res.send({ ...admin, role: UserRoles.ADMIN });
});

exports.signUpStudent = catchAsync(async (req, res, next) => {
  // await sendSMSVerification(req.user.countryCode + req.user.phone, req.user.id);

  await LastVerificationTime.create(
    {
      studentId: req.user.id,
      lastEmailVerification: Date.now(),
      lastPhoneVerification: Date.now(),
    },
    {
      updateOnDuplicate: ["last_email_verification", "last_phone_verification"],
    }
  );

  if (!req.user.emailVerified) {
    // await handleLastVerificationTime(req.user.id, "email");

    const emailVerification = await req.user.createEmailVerification({
      token: crypto({ length: 16 }),
    });
    await sendVerificationEmail(
      req.user.email,
      emailVerification.token,
      req.user.dataValues.lang
    );
  }

  const user = req.user.dataValues;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  res.status(201).json({ ...user, role: UserRoles.STUDENT });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  if (req.user) {
    if (!req.user.dataValues.lang) {
      req.session.passport.user.lang = "ar";
      req.user.setDataValue("lang", "ar");
    }

    const user = req.user;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    res.send(user);
  } else {
    res.send(null);
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const student = await Student.findOne({
    include: {
      model: EmailVerification,
      as: "emailVerification",
      required: true,
      where: { token: req.query.token },
    },
  });

  const filePath = path.join(
    path.resolve(__dirname, "../..") + "/views/email-verification.ejs"
  );

  if (student) {
    if (student.emailVerified) {
      res.render(filePath, {
        welcomeMessage: emailVerificationLink.welcomeToDarisly[req.params.lang],
        content: emailVerificationLink.alreadyVerified(req.query.email)[
          req.params.lang
        ],
        thankYouMessage: emailVerificationLink.thankYou[req.params.lang],
      });
    } else {
      const emailVerification = await student.getEmailVerification({
        where: { token: req.query.token },
      });
      if (emailVerification) {
        student.emailVerified = 1;
        student.phoneVerified = 1;
        await student.save();
        await emailVerification.destroy();

        await Student.destroy({
          where: {
            id: {
              [Op.ne]: student.id,
            },
            email: student.email,
          },
        });

        res.render(filePath, {
          welcomeMessage:
            emailVerificationLink.welcomeToDarisly[req.params.lang],
          content: emailVerificationLink.verificationSuccess[req.params.lang],
          thankYouMessage: emailVerificationLink.thankYou[req.params.lang],
        });
      } else {
        res.render(filePath, {
          welcomeMessage:
            emailVerificationLink.welcomeToDarisly[req.params.lang],
          content:
            emailVerificationLink.verificationLinkExpired[req.params.lang],
          thankYouMessage: emailVerificationLink.thankYou[req.params.lang],
        });
      }
    }
  } else {
    res.render(filePath, {
      welcomeMessage: emailVerificationLink.welcomeToDarisly[req.params.lang],
      content: emailVerificationLink.notFound(req.query.email)[req.params.lang],
      thankYouMessage: emailVerificationLink.thankYou[req.params.lang],
    });
  }
});

exports.verifyPhone = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  console.log("Request Body: ", req.body);
  let verificationResult;

  try {
    verificationResult = await twilioVerify.verificationChecks.create({
      code,
      to: req.user.countryCode + req.user.phone,
    });
    req.user.phoneVerified = 1;
    await req.user.save();
  } catch (e) {
    if (e.status == 404 && e.code == 20404) {
      throw {
        name: "ArgumentError",
        body: {
          msg: errors.verificationCode.invalid,
          param: "code",
          location: "body",
        },
      };
    }
    throw {
      name: "TwilioError",
    };
  }

  if (verificationResult.status != "approved" || !verificationResult.valid) {
    throw {
      name: "ArgumentError",
      body: {
        msg: errors.verificationCode.invalid,
        param: "code",
        location: "body",
      },
    };
  }

  res.status(200).end();
});

exports.resendPhoneVerification = async (req, res, next) => {
  await sendSMSVerification(req.user.countryCode + req.user.phone, req.user.id);

  await LastVerificationTime.create(
    { studentId: req.user.id, lastPhoneVerification: Date.now() },
    { updateOnDuplicate: ["last_phone_verification"] }
  );

  res.status(200).end();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const Model = req.body.role == UserRoles.STUDENT ? Student : Tutor;

  const token = crypto({ length: 20 }).toString("hex");

  await Model.update(
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 1 * 60 * 60 * 1000,
    },
    { where: { email: req.body.email } }
  );

  await sendResetPasswordEmail(
    req.body.email,
    token,
    req.body.role,
    req.params.lang
  );

  res.status(200).end();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const Model = req.body.role == UserRoles.STUDENT ? Student : Tutor;

  const password = await bcrypt.hash(req.body.password, 10);

  await Model.update(
    {
      password,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    { where: { resetPasswordToken: req.body.token } }
  );

  res.status(200).end();
});

exports.checkResetPassword = catchAsync(async (req, res, next) => {
  const Model = req.query.role == UserRoles.STUDENT ? Student : Tutor;

  let existingUser = await Model.findOne({
    where: {
      resetPasswordToken: req.query.token,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!existingUser) {
    throw {
      name: "ArgumentError",
      body: {
        msg: errors.resetPasswordToken.invalid,
        param: "token",
        location: "body",
      },
    };
  }

  res.status(200).end();
});

exports.checkResendPhoneVerification = catchAsync(async (req, res, next) => {
  const result = await LastVerificationTime.findByPk(req.user.id, {
    attributes: ["lastPhoneVerification"],
  });

  res
    .json({
      lastPhoneVerification: result ? result.lastPhoneVerification : null,
    })
    .end();
});

exports.checkResendEmailConfirmation = catchAsync(async (req, res, next) => {
  const result = await LastVerificationTime.findByPk(req.user.id, {
    attributes: ["lastEmailVerification"],
  });

  res
    .json({
      lastEmailConfirmation: result ? result.lastEmailVerification : null,
    })
    .end();
});

exports.resendEmailConfirmation = async (req, res, next) => {
  const emailVerification = await req.user.createEmailVerification({
    token: crypto({ length: 16 }),
  });

  await sendVerificationEmail(
    req.user.email,
    emailVerification.token,
    req.user.dataValues.lang
  );

  await LastVerificationTime.create(
    { studentId: req.user.id, lastEmailVerification: Date.now() },
    { updateOnDuplicate: ["last_email_verification"] }
  );

  res.status(200).end();
};

exports.cancelSignup = catchAsync(async (req, res, next) => {
  const role = req.user.role;

  let model;

  if (role === UserRoles.TUTOR) {
    model = Tutor;
  } else {
    model = Student;
  }

  await sequelize.transaction(async (t) => {
    await model.destroy({
      where: {
        id: req.user.id,
      },
      transaction: t,
    });
    await this.logout(req, res, next);
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  req.logout();
  res.redirect(process.env.WEB_APP_URL);
});
