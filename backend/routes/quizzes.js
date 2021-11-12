const express = require("express");
const quizController = require("../controllers/quizController/quiz");
const quizValidator = require("../controllers/quizController/quizValidator");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const { authorizeUserToQuiz } = require("../middlewares/authorization/quizzes");
const {
  authorizeUserToQuizSession,
} = require("../middlewares/authorization/quizSessions");

const router = express.Router();

router
  .route("/:quizId/students/:studentId/answers")
  .get(
    validation(quizValidator.getStudentQuizAnswers),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToQuiz,
    quizController.getStudentQuizAnswers
  );

// DEPRECATED

// router
//   .route("/sessions/:quizSessionId")
//   .delete(
//     restrictTo(UserRoles.TUTOR),
//     authorizeUserToQuizSession,
//     quizController.deleteQuizSession
//   )
//   .patch(
//     validation(quizValidator.patchQuizSession),
//     restrictTo(UserRoles.TUTOR),
//     authorizeUserToQuizSession,
//     quizController.patchQuizSession
//   );

// DEPRECATED

// router
//   .route("/:quizId/sessions")
//   .post(
//     validation(quizValidator.addQuizSession),
//     restrictTo(UserRoles.TUTOR),
//     authorizeUserToQuiz,
//     quizController.addQuizSession
//   );

router
  .route("/:quizId/qna")
  .get(
    restrictTo(UserRoles.STUDENT),
    authorizeUserToQuiz,
    quizController.getQuizQuestionsAndAnswers
  );

router
  .route("/:quizId/questions")
  .get(
    restrictTo(UserRoles.STUDENT),
    authorizeUserToQuiz,
    quizController.getQuizQuestions
  );

router
  .route("/:quizId/students")
  .get(
    validation(quizValidator.getQuizStudents),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToQuiz,
    quizController.getQuizStudents
  );

router
  .route("/:quizId/answer")
  .post(
    validation(quizValidator.answerQuiz),
    restrictTo(UserRoles.STUDENT),
    authorizeUserToQuiz,
    quizController.answerQuiz
  );

router
  .route("/:quizId/retake")
  .delete(restrictTo(UserRoles.STAFF), quizController.retakeQuiz);

router
  .route("/:quizId")
  .get(
    restrictTo(UserRoles.TUTOR, UserRoles.STUDENT),
    authorizeUserToQuiz,
    quizController.getQuiz
  )
  .patch(
    validation(quizValidator.patchQuiz),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToQuiz,
    quizController.patchQuiz
  )
  .delete(
    restrictTo(UserRoles.TUTOR),
    authorizeUserToQuiz,
    quizController.deleteQuiz
  );

router
  .route("/")
  .get(
    restrictTo(UserRoles.TUTOR, UserRoles.STUDENT),
    quizController.getQuizzes
  );

module.exports = router;
