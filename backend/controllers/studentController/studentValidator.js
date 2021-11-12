const { body } = require("express-validator");
const validator = require("validator");
const { Student } = require("../../models");
const validCountryCodes = require("../../utils/validCountryCodes");
const errors = require("../../utils/errors");
const catchAsync = require("../../utils/catchAsync");

// TODO add validations for address, grade, city, area, educationSystem, address

exports.patchStudent = [
  body("email") // DONE update tutorId in where condition
    .optional()
    .isLength({ max: 50 })
    .withMessage("Email should not exceed 50 characters long")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      let existingUser = await Student.findOne({
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

      // DONE get tutorId from logged in user
      let existingUser = await Student.findOne({
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
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw {
          name: "ArgumentError",
          body: {
            msg: errors.password.unchanged,
            param: "newPassword",
            location: "body",
          },
        };
      }
    })
    .trim(),
];
