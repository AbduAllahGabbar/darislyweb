const { body, param, query } = require("express-validator");
const { Course, Subject, Center } = require("../../models");

exports.patchLecture = [
  param("lectureId")
    .exists({ checkFalsy: true })
    .withMessage("lectureId is required")
    .isInt({ min: 1 })
    .withMessage("lectureId must be a positive integer"),

  body("sectionId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("sectionId must be a positive integer"),

  body("title")
    .optional()
    .isString({ max: 1000 })
    .withMessage("title can only be 1000 characters long at most"),

  body("price")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("price of lecture must be a number"),
];

exports.patchSection = [
  param("sectionId")
    .exists({ checkFalsy: true })
    .withMessage("sectionId is required")
    .isInt({ min: 1 })
    .withMessage("sectionId must be a positive integer"),

  body("courseId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("courseId must be a positive integer"),

  body("title")
    .optional()
    .isString({ max: 1000 })
    .withMessage("title can only be 1000 characters long at most"),
];

exports.getCourseGroupLectures = [
  param("courseGroupId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupId is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupId must be a positive integer"),

  query("from")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),

  query("to")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date in ISO8601 format"),
];
