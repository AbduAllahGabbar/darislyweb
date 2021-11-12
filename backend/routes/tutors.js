const express = require("express");
const tutorController = require("../controllers/tutorController/tutor");
const tutorValidator = require("../controllers/tutorController/tutorValidator");
const courseController = require("../controllers/courseController/course");
const courseValidator = require("../controllers/courseController/courseValidator");
const validation = require("../middlewares/validation");
const { UserRoles } = require("../enums/index");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router
  .route("/stats")
  .get(
    restrictTo(UserRoles.TUTOR),
    validation(tutorValidator.getStats),
    tutorController.getStats
  );

router
  .route("/sessions")
  .get(
    restrictTo(UserRoles.TUTOR),
    validation(tutorValidator.getSessions),
    tutorController.getSessions
  );

router
  .route("/students")
  .get(restrictTo(UserRoles.TUTOR), tutorController.getStudentsOfTutor);

router
  .route("/settings")
  .patch(
    restrictTo(UserRoles.TUTOR),
    validation(tutorValidator.patchTutor),
    tutorController.patchTutor
  );

router
  .route("/:tutorId/courses")
  .get(
    validation(courseValidator.getTutorCourses),
    courseController.getTutorCourses
  );

router
  .route("/")
  .get(validation(tutorValidator.getTutors), tutorController.getTutors);

router
  .route("/changepassword")
  .patch(
    validation(tutorValidator.changePassword),
    tutorController.changePassword
  );

module.exports = router;
