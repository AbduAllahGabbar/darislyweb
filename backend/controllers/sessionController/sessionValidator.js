const { body, param, query } = require("express-validator");
const { Course, Session, CourseGroupSession } = require("../../models");

exports.addAttendance = [
  param("courseGroupSessionId")
    .exists({ checkFalsy: true })
    .withMessage("sessionId is required")
    .isInt({ min: 0 })
    .withMessage("sessionId must be a positive integer")
    .custom(async (value) => {
      const session = await CourseGroupSession.findByPk(value);
      if (!session) return Promise.reject("No session exists with this id");
    }),

  body("attendance")
    .exists({ checkFalsy: true })
    .withMessage("attendance is required")
    .isArray()
    .withMessage("attendance must be an array"),
];

exports.getCourseGroupSessionAttendance = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  param("courseGroupSessionId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupSessionId is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupSessionId must be a positive int")
    .custom(async (value) => {
      const courseGroupSession = await CourseGroupSession.findByPk(value);
      if (!courseGroupSession)
        return Promise.reject("No courseGroup exists with this id");
    }),
];

exports.patchSession = [
  param("sessionId")
    .exists({ checkNull: true })
    .withMessage("sessionId is required")
    .isInt({ min: 1 })
    .withMessage("sessionId must be a positive integer"),

  body("lectureId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("lectureId must be a positive id"),

  body("from").optional().isString().withMessage("from must be a time"),

  body("to").optional().isString().withMessage("to must be a time"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("date must be an ISO8601 date"),
];

exports.getSession = [
  param("courseGroupSessionId")
    .exists({ checkNull: true })
    .withMessage("courseGroupSessionId is required")
    .isInt({ min: 0 })
    .withMessage("courseGroupSessionId must be an integer"),
];
