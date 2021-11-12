const express = require("express");
const sessionController = require("../controllers/sessionController/session");
const sessionValidator = require("../controllers/sessionController/sessionValidator");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const {
  authorizeUserToCourseGroupSession,
} = require("../middlewares/authorization/courseGroupSessions");

const router = express.Router();

router
  .route("/:courseGroupSessionId/schedule")
  .post(
    restrictTo(UserRoles.STUDENT),
    authorizeUserToCourseGroupSession,
    sessionController.addSessionSchedule
  );

router
  .route("/:courseGroupSessionId/attendance")
  .get(
    restrictTo(UserRoles.STUDENT),
    authorizeUserToCourseGroupSession,
    sessionController.getStudentSessionAttendance
  )
  .put(
    validation(sessionValidator.addAttendance),
    restrictTo(UserRoles.TUTOR, UserRoles.STAFF),
    authorizeUserToCourseGroupSession,
    sessionController.addAttendance
  );

router
  .route("/:courseGroupSessionId")
  .get(
    validation(sessionValidator.getSession),
    restrictTo(UserRoles.STUDENT),
    authorizeUserToCourseGroupSession,
    sessionController.getSession
  )
  .patch(
    validation(sessionValidator.patchSession),
    sessionController.patchSession
  );

module.exports = router;
