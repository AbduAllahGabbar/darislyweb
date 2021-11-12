const express = require("express");
const studentController = require("../controllers/studentController/student");
const studentValidator = require("../controllers/studentController/studentValidator");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const {
  authorizeUserToCourseGroupSession,
} = require("../middlewares/authorization/courseGroupSessions");

const router = express.Router();

router
  .route("/sessions/:courseGroupSessionId/attendance")
  .put(
    restrictTo(UserRoles.STUDENT),
    authorizeUserToCourseGroupSession,
    studentController.addAttendance
  );

router
  .route("/settings")
  .patch(
    validation(studentValidator.patchStudent),
    studentController.patchStudent
  );

router.route("/stats").get(studentController.getCourseStats);

router.route("/calendarsessions").get(studentController.getCalendarSessions);

router.route("/courses").get(studentController.getCourses);

router
  .route("/changepassword")
  .patch(
    validation(studentValidator.changePassword),
    studentController.changePassword
  );

module.exports = router;
