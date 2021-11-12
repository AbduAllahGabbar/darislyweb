const express = require("express");
const notificationValidator = require("../controllers/notificationController/notificationValidator");
const notificationController = require("../controllers/notificationController/notification");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");

const router = express.Router();

router
  .route("/read")
  .post(
    restrictTo(UserRoles.STUDENT),
    validation(notificationValidator.readNotifications),
    notificationController.readNotifications
  );

router
  .route("/")
  .get(
    restrictTo(UserRoles.STUDENT),
    validation(notificationValidator.getStudentNotifications),
    notificationController.getStudentNotifications
  );

module.exports = router;
