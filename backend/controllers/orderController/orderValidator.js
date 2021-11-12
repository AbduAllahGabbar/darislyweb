const { body, param } = require("express-validator");

exports.createOrder = [
  body("courseGroupSessions")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupSessions is required")
    .isArray()
    .withMessage("courseGroupSessions must be an array"),

  body("type")
    .exists({ checkNull: true })
    .withMessage("type is required")
    .isInt({ min: 0, max: 4 })
    .withMessage("type must be an integer between 0 and 4"),

  body("centerId")
    .exists({ checkNull: true })
    .withMessage("centerId is required")
    .isInt({ min: 1 })
    .withMessage("centerId must be a positive integer"),

  body("courseGroupSessions.*.id")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupSessions.id is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupSessions.id must be a positive integer"),

  body("courseGroupSessions.*.type")
    .exists({ checkNull: true })
    .withMessage("courseGroupSessions.type is required")
    .isInt({ min: 0 })
    .withMessage("courseGroupSessions.type must be an integer"),
];

exports.getOrder = [
  param("orderId")
    .isInt({ min: 1 })
    .withMessage("orderId must be a positive integer"),
];

exports.changeOrderStatus = [
  param("orderId")
    .isInt({ min: 1 })
    .withMessage("orderId must be a positive integer"),

  body("status")
    .exists({ checkNull: true })
    .withMessage("status is required")
    .isInt({ min: 0, max: 4 })
    .withMessage("status must be a positive integer between 0 and 4"),

  body("type").optional().isInt(),

  body("discount").optional().isFloat(),
];
