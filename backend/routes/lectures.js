const express = require("express");
const lectureValidator = require("../controllers/lectureController/lectureValidator");
const lectureController = require("../controllers/lectureController/lecture");
const quizValidator = require("../controllers/quizController/quizValidator");
const quizController = require("../controllers/quizController/quiz");
const materialController = require("../controllers/materialController/material");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const {
  authorizeUserToLecture,
} = require("../middlewares/authorization/lectures");
const multer = require("multer");

const uploadMaterial = multer({
  dest: "temp/",
  limits: { fileSize: process.env.MAX_FILE_SIZE * 1024 * 1024 }, // MAX_FILE_SIZE in MB
});

const router = express.Router();

router.route("/:lectureId/sessions").get(lectureController.getLectureSessions);

router
  .route("/:lectureId/quizzes")
  .post(
    validation(quizValidator.addLectureQuiz),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToLecture,
    quizController.addLectureQuiz
  );

router
  .route("/:lectureId")
  .patch(
    validation(lectureValidator.patchLecture),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToLecture,
    lectureController.patchLecture
  );

router
  .route("/:lectureId/material")
  .get(
    restrictTo(UserRoles.STUDENT, UserRoles.TUTOR),
    materialController.getLectureMaterial
  )
  .post(
    restrictTo(UserRoles.TUTOR),
    uploadMaterial.any("files"),
    materialController.addMaterial
  );

router
  .route("/material/:materialId")
  .get(
    restrictTo(UserRoles.STUDENT, UserRoles.TUTOR),
    materialController.downloadMaterial
  )
  .delete(restrictTo(UserRoles.TUTOR), materialController.deleteMaterial);

module.exports = router;
