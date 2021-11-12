const express = require("express");
const courseController = require("../controllers/courseController/course");
const lectureController = require("../controllers/lectureController/lecture");
const courseValidator = require("../controllers/courseController/courseValidator");
const announcementController = require("../controllers/announcementController/announcement");
const announcementValidator = require("../controllers/announcementController/announcementValidator");
const {
  authorizeUserToCourse,
} = require("../middlewares/authorization/courses");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");

const router = express.Router();

router
  .route("/:courseId/students/:studentId/lectures")
  .get(courseController.getCourseLecturesForStudent);

router
  .route("/:courseId/coursebuilder")
  .get(courseController.getCourseBuilderData)
  .patch(courseController.patchCourseBuilderData);

router
  .route("/:courseId/groups")
  .get(
    validation(courseValidator.getCourseGroups),
    courseController.getCourseGroups
  )
  .post(
    validation(courseValidator.createCourseGroup),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourse,
    courseController.createCourseGroup
  );

router
  .route("/:courseId/lectures")
  .get(
    validation(courseValidator.getCourseLectures),
    courseController.getCourseLectures
  )
  .post(
    validation(courseValidator.createCourseLectures),
    restrictTo(UserRoles.TUTOR),
    authorizeUserToCourse,
    courseController.createCourseLectures
  );

router
  .route("/:courseId/announcements")
  .post(
    validation(announcementValidator.addAnnouncement),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourse,
    announcementController.addAnnouncement
  )
  .get(
    validation(announcementValidator.getCourseAnnouncements),
    restrictTo(UserRoles.STAFF, UserRoles.STUDENT, UserRoles.TUTOR),
    authorizeUserToCourse,
    announcementController.getCourseAnnouncements
  );

router
  .route("/:courseId/students")
  .get(
    validation(courseValidator.getCourseStudents),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourse,
    courseController.getCourseStudents
  );

router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(
    validation(courseValidator.patchCourse),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourse,
    courseController.patchCourse
  )
  .delete(
    validation(courseValidator.deleteCourse),
    restrictTo(UserRoles.STAFF, UserRoles.TUTOR),
    authorizeUserToCourse,
    courseController.deleteCourse
  );

router
  .route("/")
  .get(courseController.getCourses)
  .post(
    restrictTo(UserRoles.TUTOR),
    validation(courseValidator.createCourse),
    courseController.createCourse
  );

router
  .route("/:courseId/material/lectures")
  .get(
    restrictTo(UserRoles.STUDENT, UserRoles.TUTOR),
    lectureController.getCourseMaterialLectures
  );

module.exports = router;
