const express = require("express");
const courseController = require("../controllers/courseController/course");
const courseValidator = require("../controllers/courseController/courseValidator");
const lectureController = require("../controllers/lectureController/lecture");
const lectureValidator = require("../controllers/lectureController/lectureValidator");
const sessionController = require("../controllers/sessionController/session");
const sessionValidator = require("../controllers/sessionController/sessionValidator");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const {
  authorizeUserToCourseGroup,
} = require("../middlewares/authorization/courseGroups");
const {
  authorizeUserToCourseGroupSession,
} = require("../middlewares/authorization/courseGroupSessions");

const router = express.Router();

router
  .route("/:courseGroupId/lectures")
  .get(
    validation(lectureValidator.getCourseGroupLectures),
    restrictTo(UserRoles.STUDENT, UserRoles.TUTOR, UserRoles.STAFF),
    lectureController.getCourseGroupLectures
  );

router
  .route("/:courseGroupSessionId/attendance")
  .get(
    validation(sessionValidator.getCourseGroupSessionAttendance),
    restrictTo(UserRoles.TUTOR, UserRoles.STAFF),
    authorizeUserToCourseGroupSession,
    sessionController.getCourseGroupSessionAttendance
  );

router
  .route("/:courseGroupId")
  .patch(
    validation(courseValidator.patchCourseGroup),
    restrictTo(UserRoles.TUTOR, UserRoles.STAFF),
    authorizeUserToCourseGroup,
    courseController.patchCourseGroup
  )
  .delete(
    validation(courseValidator.deleteCourseGroup),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourseGroup,
    courseController.deleteCourseGroup
  );

module.exports = router;
