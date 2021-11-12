const { check, body, query } = require("express-validator");
const validator = require("validator");
const UserRoles = require("../../enums").UserRoles;
const validCountryCodes = require("../../utils/validCountryCodes");
const { Student, Tutor } = require("../../models");
const { validateEmail } = require("../../services/quickEmailVerification");

const errors = require("../../utils/errors");

exports.signUpStudent = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage(errors.email.required)
    .isLength({ max: 50 })
    .withMessage(errors.email.invalidLength)
    .isEmail()
    .withMessage(errors.email.invalid)
    // .custom(async (value, { req }) => {
    //   const emailValid = await validateEmail(value);
    //   if (!emailValid) {
    //     return Promise.reject(errors.email.invalid);
    //   }
    // })
    .trim()
    .normalizeEmail({ gmail_remove_dots: false }),

  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage(errors.firstName.required)
    .isLength({ max: 20 })
    .withMessage(errors.firstName.invalidLength)
    .trim(),

  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage(errors.lastName.required)
    .isLength({ max: 20 })
    .withMessage(errors.lastName.invalidLength)
    .trim(),

  check("phone")
    .exists({ checkFalsy: true })
    .withMessage(errors.phone.required)
    .isLength({ max: 15 })
    .withMessage(errors.phone.invalidLength)
    .custom(async (value, { req }) => {
      const isPhoneValid = validator.isMobilePhone(
        req.body.countryCode + value
      );

      if (!isPhoneValid) {
        return Promise.reject(errors.phone.invalid);
      }

      let existingUser = await Student.findOne({
        where: {
          phone: value,
          countryCode: req.body.countryCode,
          phoneVerified: 1,
        },
      });

      if (existingUser) {
        return Promise.reject(errors.phone.exists);
      }
    })
    .trim(),

  check("countryCode")
    .exists({ checkFalsy: true })
    .withMessage(errors.countryCode.required)
    .isLength({ max: 10 })
    .isIn(validCountryCodes)
    .withMessage(errors.countryCode.invalid),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage(errors.country.required)
    .isInt({ min: 1, max: 240 })
    .withMessage(errors.country.invalid),

  body("password")
    .optional()
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),
];

exports.signIn = [
  check("id")
    .exists({ checkFalsy: true })
    .withMessage(errors.email.required)
    .isLength({ max: 50 })
    .withMessage(errors.email.invalidLength)
    .isEmail()
    .withMessage(errors.email.invalid)
    .trim()
    .normalizeEmail({ gmail_remove_dots: false }),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage(errors.password.required)
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),
];

exports.signInStaff = [
  body("username")
    .exists({ checkFalsy: true })
    .withMessage(errors.username.required)
    .isLength({ max: 20 })
    .withMessage(errors.username.invalidLength)
    .trim(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage(errors.password.required)
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),
];

exports.verifyPhone = [
  check("code")
    .exists({ checkFalsy: true })
    .withMessage(errors.verificationCode.required)
    .isLength({ min: 4, max: 4 })
    .withMessage(errors.verificationCode.invalidLength),
];

exports.forgotPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage(errors.email.required)
    .isLength({ max: 50 })
    .withMessage(errors.email.invalidLength)
    .isEmail()
    .withMessage(errors.email.invalid)
    .custom(async (value, { req }) => {
      const Model = req.body.role === UserRoles.STUDENT ? Student : Tutor;
      let existingUser = await Model.findOne({ where: { email: value } });

      if (!existingUser) {
        return Promise.reject(errors.email.notExists);
      }
    })
    .trim()
    .normalizeEmail({ gmail_remove_dots: false }),

  body("role")
    .exists()
    .withMessage("Role is required")
    .isInt({ min: 0, max: 1 })
    .withMessage("Role must be between 0 or 1"),
];

exports.resetPassword = [
  body("token")
    .exists({ checkFalsy: true })
    .withMessage("Token is required")
    .isLength({ min: 20, max: 20 })
    .withMessage("Token should be 20 characters long")
    .trim(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage(errors.password.required)
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),

  body("role")
    .exists()
    .withMessage("Role is required")
    .isInt({ min: 0, max: 1 })
    .withMessage("Role must be between 0 or 1"),
];

exports.checkResetPassword = [
  query("token")
    .exists({ checkFalsy: true })
    .withMessage(errors.resetPasswordToken.invalid)
    .isLength({ min: 20, max: 20 })
    .withMessage(errors.resetPasswordToken.invalid)
    .trim(),

  query("role")
    .exists()
    .withMessage(errors.resetPasswordToken.invalid)
    .isInt({ min: 0, max: 1 })
    .withMessage(errors.resetPasswordToken.invalid),
];
