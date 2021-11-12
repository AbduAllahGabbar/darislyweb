const { param, body, query } = require("express-validator");
const { Order, CourseGroup } = require("../../models");
const errors = require("../../utils/errors");

exports.getStudentOrders = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  query("search")
    .optional()
    .isLength({ max: 40 })
    .withMessage("studentName should not exceed 40 characters long")
    .trim(),
];

exports.validateOrderPayment = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  param("orderId")
    .exists({ checkNull: true })
    .withMessage("orderId is required")
    .isInt({ min: 0 })
    .withMessage("orderId must be a positive integer")
    .custom(async (value) => {
      const order = await Order.findByPk(value);
      if (!order) return Promise.reject("No order exists with this id");
    }),

  body("paymentStatus")
    .exists({ checkNull: true })
    .withMessage("paymentStatus is required")
    .isInt({ min: 0, max: 4 })
    .withMessage("paymentStatus must be an integer between 0 and 4"),
];

exports.getCourseGroupStudents = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  param("courseGroupId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupId is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupId must be a positive int")
    .custom(async (value) => {
      const courseGroup = await CourseGroup.findByPk(value);
      if (!courseGroup)
        return Promise.reject("No courseGroup exists with this id");
    }),
];

exports.getCourseGroupSessions = [
  param("courseGroupId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupId is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupId must be a positive int")
    .custom(async (value) => {
      const courseGroup = await CourseGroup.findByPk(value);
      if (!courseGroup)
        return Promise.reject("No courseGroup exists with this id");
    }),

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

exports.migrateOrderItem = [
  body("sessionId")
    .exists({ checkFalsy: true })
    .withMessage("sessionId is required"),
];
