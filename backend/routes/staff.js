const express = require("express");
const staffController = require("../controllers/staffController/staff");
const staffValidator = require("../controllers/staffController/staffValidator");
const sessionController = require("../controllers/sessionController/session");
const sessionValidator = require("../controllers/sessionController/sessionValidator");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const {
  authorizeUserToCourseGroup,
} = require("../middlewares/authorization/courseGroups");
const {
  authorizeUserToCourseGroupSession,
} = require("../middlewares/authorization/courseGroupSessions");
const { UserRoles } = require("../enums/index");
const router = express.Router();

router
  .route("/orderitems/:orderItemId")
  .patch(
    validation(staffValidator.migrateOrderItem),
    restrictTo(UserRoles.STAFF),
    staffController.migrateOrderItem
  );

router.route("/coursegroups/:courseGroupId/students").get(
  validation(staffValidator.getCourseGroupStudents),
  restrictTo(UserRoles.STAFF),
  // authorizeUserToCourseGroup,
  staffController.getCourseGroupStudents
);

router.route("/sessions/:courseGroupSessionId/attendance").put(
  validation(sessionValidator.addAttendance),
  restrictTo(UserRoles.STAFF),
  // authorizeUserToCourseGroupSession,
  sessionController.addAttendance
);

router.route("/coursegroups/:courseGroupSessionId/attendance").get(
  validation(sessionValidator.getCourseGroupSessionAttendance),
  restrictTo(UserRoles.STAFF),
  // authorizeUserToCourseGroupSession,
  sessionController.getCourseGroupSessionAttendance
);

router.route("/coursegroups/:courseGroupId/sessions").get(
  validation(staffValidator.getCourseGroupSessions),
  restrictTo(UserRoles.STAFF),
  // authorizeUserToCourseGroup,
  staffController.getCourseGroupSessions
);

// router
//   .route("/orders/:orderId/validate")
//   .patch(
//     validation(staffValidator.validateOrderPayment),
//     staffController.validateOrderPayment
//   );

router
  .route("/coursegroups")
  .get(restrictTo(UserRoles.STAFF), staffController.getCourseGroups);

router
  .route("/orders")
  .get(
    restrictTo(UserRoles.STAFF),
    validation(staffValidator.getStudentOrders),
    staffController.getStudentOrders
  );

router
  .route("/changepassword")
  .patch(
    restrictTo(UserRoles.STAFF),
    validation(staffValidator.changePassword),
    staffController.changePassword
  );

module.exports = router;
