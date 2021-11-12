const { body, query } = require("express-validator");
const validator = require("validator");
const { Tutor } = require("../../models/");
const validCountryCodes = require("../../utils/validCountryCodes");
const errors = require("../../utils/errors");

exports.getTutors = [
  query("tutorName")
    .optional()
    .isLength({ max: 40 })
    .withMessage("A name can be at most 40 characters long"),

  query("education")
    .optional()
    .isInt({ min: 0, max: 99 })
    .withMessage("Education must be an integer between 0 and 99 inclusive"),

  query("grade")
    .optional()
    .isInt({ min: 0, max: 99 })
    .withMessage("Grade must be an integer between 0 and 99 inclusive"),
];

exports.patchTutor = [
  body("email") // DONE update tutorId in where condition
    .optional()
    .isLength({ max: 50 })
    .withMessage("Email should not exceed 50 characters long")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      let existingUser = await Tutor.findOne({
        where: {
          email: value,
          id: { [Op.ne]: req.user.id },
        },
      });

      if (existingUser) {
        return Promise.reject(
          "Email already exists, please pick a different one."
        );
      }
    })
    .trim()
    .normalizeEmail(),

  body("firstName")
    .optional()
    .isLength({ max: 20 })
    .withMessage("First Name should not exceed 20 characters long")
    .trim(),

  body("lastName")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Last Name should not exceed 20 characters long")
    .trim(),

  body("phone")
    .optional()
    .isLength({ max: 15 })
    .withMessage("Phone should not exceed 15 characters long")
    .custom(async (value, { req }) => {
      if (!req.body.countryCode)
        return Promise.reject("Please provide country code with phone number");

      const isPhoneValid = validator.isMobilePhone(
        req.body.countryCode + value
      );

      if (!isPhoneValid) {
        return Promise.reject("Phone not valid");
      }

      // DONE get tutor id from the logged in user
      let existingUser = await Tutor.findOne({
        where: {
          id: { [Op.ne]: req.user.id },
          phone: value,
          countryCode: req.body.countryCode,
        },
      });

      if (existingUser) {
        return Promise.reject(
          "Phone already exists, please pick a different one."
        );
      }
    })
    .trim(),

  body("countryCode")
    .optional()
    .isLength({ max: 10 })
    .isIn(validCountryCodes)
    .withMessage("Please enter a valid country code"),

  body("country")
    .optional()
    .isInt({ min: 1, max: 240 })
    .withMessage("country must be an integer between 1 and 240"),
];

exports.getStats = [
  query("from")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),

  query("to")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),
];

exports.changePassword = [
  body("oldPassword")
    .exists({ checkFalsy: true })
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),
  body("newPassword")
    .exists({ checkFalsy: true })
    .isLength({ min: 8, max: 60 })
    .withMessage(errors.password.invalid)
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(errors.password.invalid)
    .trim(),
];

exports.getSessions = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  query("from")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),

  query("to")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),
];
