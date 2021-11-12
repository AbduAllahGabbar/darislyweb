const { body, param, query } = require("express-validator");
const validator = require("validator");

exports.getStudentNotifications = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),
];

exports.readNotifications = [
  body("notifications")
    .exists({ checkFalsy: true })
    .withMessage("notifications is required")
    .isArray()
    .withMessage("notifications must be an array"),
];
