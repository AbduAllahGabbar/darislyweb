const { body, param } = require("express-validator");
const validator = require("validator");
const { Student, Tutor } = require("../../models");

exports.addAnnouncement = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer"),

  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title is required")
    .isLength({ max: 50 })
    .withMessage("title can be at most 50 characters long"),

  body("content")
    .exists({ checkNull: true })
    .withMessage("content is required")
    .isLength({ max: 300 })
    .withMessage("content can be at most 300 characters long"),
];

exports.getCourseAnnouncements = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer"),
];
