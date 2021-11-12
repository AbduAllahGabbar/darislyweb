const { param, body, query } = require("express-validator");
const { Quiz, Lecture, Course } = require("../../models");
const AppError = require("../../utils/appError");

exports.addLectureQuiz = [
  param("lectureId")
    .exists({ checkFalsy: true })
    .withMessage("lectureId is required")
    .isInt({ min: 0 })
    .withMessage("lectureId must 0 or greater")
    .custom(async (value) => {
      const lecture = await Lecture.findByPk(value);

      if (!lecture) {
        return Promise.reject("There is no lecture with this id");
      }
    }),

  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  body("questions")
    .exists({ checkFalsy: true })
    .withMessage("questions is required")
    .isArray()
    .withMessage("questions must be an array"),

  body("questions.*.questionText")
    .exists({ checkFalsy: true })
    .withMessage("questions.questionText is required"),

  body("questions.*.choices")
    .exists({ checkFalsy: true })
    .withMessage("questions.choices is required")
    .isArray()
    .withMessage("questions.choices must be an array"),

  body("questions.*.correctAnswerIdx")
    .exists({ checkNull: true })
    .withMessage("questions.correctAnswerIdx is required"),

  body("questions.*.hasImage")
    .exists({ checkNull: true })
    .withMessage("questions.hasImage is required"),

  body("type")
    .exists({ checkNull: true })
    .withMessage("type is required")
    .isInt()
    .withMessage("type must be an integer"),

  body("from")
    .exists({ checkFalsy: true })
    .withMessage("from is required")
    .isISO8601()
    .withMessage("from must be an ISO8601 date"),

  body("to")
    .exists({ checkFalsy: true })
    .withMessage("to is required")
    .isISO8601()
    .withMessage("to must be an ISO8601 date"),

  body("duration")
    .exists({ checkNull: true })
    .withMessage("duration is required")
    .isInt({ min: 1 })
    .withMessage("duration must be 1 minute at least"),
];

// TODO validate that answers array has the same length as questions array
exports.answerQuiz = [
  param("quizId")
    .exists({ checkFalsy: true })
    .withMessage("quizId is required")
    .isInt({ min: 0 })
    .withMessage("quizId must be an integer")
    .toInt(),

  body("answers")
    .exists({ checkFalsy: true })
    .withMessage("answers is required")
    .isArray()
    .withMessage("answers must be an array")
    .custom(async (answers) => {
      for (let i = 0; i < answers.length; i++) {
        if (isNaN(Number(answers[i]))) return Promise.reject("Invalid answers");
      }
    })
    .customSanitizer((answers) => {
      return answers.map((answer) => Number(answer));
    }),
];

exports.patchQuiz = [
  param("quizId")
    .exists({ checkNull: true })
    .withMessage("quizId is required")
    .isInt({ min: 1 })
    .withMessage("quizId must 1 or greater"),

  body("name").optional().isString().withMessage("name must be a string"),

  body("questions")
    .optional()
    .isArray()
    .withMessage("questions must be an array"),

  body("questions.*.questionText")
    .exists({ checkFalsy: true })
    .withMessage("questions.questionText is required"),

  body("questions.*.choices")
    .exists({ checkFalsy: true })
    .withMessage("questions.choices is required")
    .isArray()
    .withMessage("questions.choices must be an array"),

  body("questions.*.correctAnswerIdx")
    .exists({ checkNull: true })
    .withMessage("questions.correctAnswerIdx is required"),

  body("questions.*.hasImage")
    .exists({ checkNull: true })
    .withMessage("questions.hasImage is required"),

  body("type").optional().isInt().withMessage("type must be an integer"),

  body("lectureId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("lectureId must 1 or greater")
    .custom(async (value) => {
      const lecture = await Lecture.findByPk(value);

      if (!lecture) {
        return Promise.reject("There is no lecture with this id");
      }
    }),

  body("from")
    .optional()
    .isISO8601()
    .withMessage("from must be an ISO8601 date"),

  body("to").optional().isISO8601().withMessage("to must be an ISO8601 date"),

  body("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("duration must be at least 1 minute"),
];

exports.addQuizSession = [
  param("quizId")
    .exists({ checkNull: true })
    .withMessage("quizId is required")
    .isInt({ min: 1 })
    .withMessage("quizId must 1 or greater"),

  body("from")
    .exists({ checkFalsy: true })
    .withMessage("from is required")
    .isISO8601()
    .withMessage("from must be an ISO8601 date"),

  body("to")
    .exists({ checkFalsy: true })
    .withMessage("to is required")
    .isISO8601()
    .withMessage("to must be an ISO8601 date"),
];

exports.patchQuizSession = [
  param("quizSessionId")
    .exists({ checkNull: true })
    .withMessage("quizSessionId is required")
    .isInt({ min: 1 })
    .withMessage("quizSessionId must 1 or greater"),

  body("from")
    .exists({ checkFalsy: true })
    .withMessage("from is required")
    .isISO8601()
    .withMessage("from must be an ISO8601 date"),

  body("to")
    .exists({ checkFalsy: true })
    .withMessage("to is required")
    .isISO8601()
    .withMessage("to must be an ISO8601 date"),
];

exports.getQuizStudents = [
  param("quizId")
    .exists({ checkNull: true })
    .withMessage("quizId is required")
    .isInt({ min: 1 })
    .withMessage("quizId must 1 or greater"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive integer"),

  query("search").optional().isString().withMessage("search must be a string"),

  query("sort")
    .optional()
    .isString()
    .withMessage("sort must be a string")
    .isIn(["nameASC", "nameDESC", "gradeASC", "gradeDESC"]),
];

exports.getStudentQuizAnswers = [
  param("quizId")
    .exists({ checkNull: true })
    .withMessage("quizId is required")
    .isInt({ min: 1 })
    .withMessage("quizId must 1 or greater"),

  param("studentId")
    .exists({ checkNull: true })
    .withMessage("studentId is required")
    .isInt({ min: 1 })
    .withMessage("studentId must be a positive integer"),
];
