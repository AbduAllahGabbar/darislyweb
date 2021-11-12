const { body, param, query } = require("express-validator");
const { Course, Subject, Center } = require("../../models");

exports.createCourse = [
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description should not exceed 1000 characters long"),

  body("subjectId")
    .exists({ checkFalsy: true })
    .withMessage("You must provide the id of the subject of this course")
    .custom(async (value) => {
      const subject = await Subject.findOne({
        where: {
          id: value,
        },
      });

      if (!subject) {
        return Promise.reject("There is no subject with this id");
      }
    }),

  body("education")
    .exists()
    .withMessage("Education is required")
    .isInt({ min: 0, max: 2 })
    .withMessage("Education must be between 0 and 2"),

  body("grade")
    .exists()
    .withMessage("Grade is required")
    .isInt({ min: 0, max: 11 })
    .withMessage("Grade must be between 1 and 12"),

  body("sections")
    .optional()
    .isArray()
    .withMessage("sections must be an array"),

  body("sections.*.title")
    .exists({ checkFalsy: true })
    .withMessage("A section must have a title")
    .isLength({ max: 1000 })
    .withMessage("A section can be at most 1000 characters long"),

  body("sections.*.lectures")
    .exists({ checkFalsy: true })
    .withMessage("A section must have a lectures array")
    .isArray()
    .withMessage("lectures must be an array"),

  body("sections.*.lectures.*.title")
    .exists({ checkFalsy: true })
    .withMessage("A lecture must have a title")
    .isLength({ max: 1000 })
    .withMessage("A lecture can be at most 1000 characters long"),

  body("sections.*.lectures.*.price")
    .exists({ checkFalsy: true })
    .withMessage("A lecture must have a price")
    .isFloat({ min: 0 })
    .withMessage("A lecture price must be a positive number"),
];

exports.getTutorCourses = [
  param("tutorId")
    .exists({ checkFalsy: true })
    .withMessage("tutorId is required")
    .isInt({ min: 0 })
    .withMessage("tutorId must be a positive integer"),
];

// DONE do proper validation on sections

exports.createCourseLectures = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer")
    .custom(async (value) => {
      const course = await Course.findByPk(value);
      if (!course) return Promise.reject("No course exists with this id");
    }),

  body("sections")
    .optional()
    .isArray()
    .withMessage("sections must be an array"),

  body("sections.*.title")
    .exists({ checkFalsy: true })
    .withMessage("A section must have a title")
    .isLength({ max: 1000 })
    .withMessage("A section can be at most 1000 characters long"),

  body("sections.*.lectures")
    .exists({ checkFalsy: true })
    .withMessage("A section must have a lectures array")
    .isArray()
    .withMessage("lectures must be an array"),

  body("sections.*.lectures.*.title")
    .exists({ checkFalsy: true })
    .withMessage("A lecture must have a title")
    .isLength({ max: 1000 })
    .withMessage("A lecture can be at most 1000 characters long"),

  body("sections.*.lectures.*.price")
    .exists({ checkFalsy: true })
    .withMessage("A lecture must have a price")
    .isFloat({ min: 0 })
    .withMessage("A lecture price must be a positive number"),

  body("courseGroups")
    .optional()
    .isArray()
    .withMessage("courseGroups must be an array"),

  body("courseGroups.*.weekDays")
    .exists({ checkFalsy: true })
    .withMessage("weekDays is required inside of courseGroups")
    .isString({ max: 15 })
    .withMessage("weekDays must be at most 15 characters long"),

  body("courseGroups.*.startDate")
    .exists({ checkFalsy: true })
    .withMessage("startDate is required inside of courseGroups")
    .isDate()
    .withMessage("Please enter a valid startDate in YYYY-MM-DD format"),

  body("courseGroups.*.endDate")
    .exists({ checkFalsy: true })
    .withMessage("endDate is required inside of courseGroups")
    .isDate()
    .withMessage("Please enter a valid endDate in YYYY-MM-DD format"),

  body("courseGroups.*.capacity")
    .exists({ checkFalsy: true })
    .withMessage("courseGroup capacity is required")
    .isInt({ min: 0 })
    .withMessage("courseGroup capacity must be a positive integer"),

  body("courseGroups.*.type")
    .exists({ checkFalsy: true })
    .withMessage("courseGroup type is required")
    .isInt({ min: 0, max: 4 })
    .withMessage(
      "courseGroup type must be an integer between 0 and 4 inclusive"
    ),

  body("courseGroups.*.centerId")
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("centerId must be a positive integer")
    .custom(async (val) => {
      const center = await Center.findByPk(val);
      if (!center)
        return Promise.reject("There is no center found with this id");
    }),
];

exports.getCourseStudents = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer")
    .custom(async (value) => {
      const course = await Course.findByPk(value);
      if (!course) return Promise.reject("No course exists with this id");
    }),
];

exports.getCourseGroups = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer")
    .custom(async (value) => {
      const course = await Course.findByPk(value);
      if (!course) return Promise.reject("No course exists with this id");
    }),
  query("type").trim(),
];

exports.deleteCourse = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 1 })
    .withMessage("courseId must be a positive integer"),
];

exports.patchCourse = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 1 })
    .withMessage("courseId must be a positive integer")
    .custom(async (value) => {
      const course = await Course.findByPk(value);
      if (!course) return Promise.reject("No course exists with this id");
    }),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description should not exceed 1000 characters long"),

  body("subjectId")
    .optional()
    .custom(async (value) => {
      const subject = await Subject.findOne({
        where: {
          id: value,
        },
      });

      if (!subject) {
        return Promise.reject("There is no subject with this id");
      }
    }),

  body("education")
    .optional()
    .isInt({ min: 0, max: 2 })
    .withMessage("Education must be between 0 and 2"),

  body("grade")
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage("Grade must be between 1 and 12"),
];

exports.createCourseGroup = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 0 })
    .withMessage("courseId must be a positive integer")
    .custom(async (value) => {
      const course = await Course.findByPk(value);
      if (!course) return Promise.reject("No course exists with this id");
    }),

  body("courseGroups")
    .exists({ checkFalsy: true })
    .withMessage("courseGroups is required")
    .isArray()
    .withMessage("courseGroups must be an array"),

  body("courseGroups.*.address")
    .optional()
    .isString({ max: 50 })
    .withMessage("address must be at most 50 characters long"),

  body("courseGroups.*.areaId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("areaId must be a positive integer"),

  body("courseGroups.*.cityId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("cityId must be a positive integer"),

  body("courseGroups.*.centerId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("centerId inside of courseGroups must be an integer"),

  body("courseGroups.*.capacity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("capacity must be a positive integer"),

  body("courseGroups.*.type")
    .exists({ checkNull: true })
    .withMessage("type inside of courseGroups is required")
    .isInt({ min: 0 })
    .withMessage("type inside of courseGroups must be a positive integer"),

  body("courseGroups.*.startDate")
    .exists({ checkFalsy: true })
    .withMessage("startDate is required inside of courseGroups")
    .isDate()
    .withMessage("Please enter a valid startDate in YYYY-MM-DD format"),

  body("courseGroups.*.endDate")
    .exists({ checkFalsy: true })
    .withMessage("endDate is required inside of courseGroups")
    .isDate()
    .withMessage("Please enter a valid endDate in YYYY-MM-DD format"),
];

exports.patchCourseGroup = [
  param("courseGroupId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupId is required")
    .isInt({ min: 0 })
    .withMessage("courseGroupId must be a positive integer"),

  body("address")
    .optional()
    .isString({ max: 50 })
    .withMessage("address must be at most 50 characters long"),

  body("areaId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("areaId must be a positive integer"),

  body("cityId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("cityId must be a positive integer"),

  body("centerId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("centerId inside of courseGroups must be an integer"),

  body("capacity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("capacity must be a positive integer"),

  body("type")
    .optional()
    .isInt({ min: 0 })
    .withMessage("type inside of courseGroups must be a positive integer"),

  body("weekDays").optional(),

  body("startDate")
    .optional()
    .isDate()
    .withMessage("Please enter a valid startDate in YYYY-MM-DD format"),

  body("endDate")
    .optional()
    .isDate()
    .withMessage("Please enter a valid endDate in YYYY-MM-DD format"),
];

exports.deleteCourseGroup = [
  param("courseGroupId")
    .exists({ checkFalsy: true })
    .withMessage("courseGroupId is required")
    .isInt({ min: 1 })
    .withMessage("courseGroupId must be a positive integer"),
];

exports.getCourseLectures = [
  param("courseId")
    .exists({ checkFalsy: true })
    .withMessage("courseId is required")
    .isInt({ min: 1 })
    .withMessage("courseId must be a positive integer"),
];
