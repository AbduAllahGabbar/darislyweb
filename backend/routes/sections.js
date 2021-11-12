const express = require("express");
const lectureValidator = require("../controllers/lectureController/lectureValidator");
const lectureController = require("../controllers/lectureController/lecture");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");

const router = express.Router();

router
  .route("/:sectionId")
  .patch(
    validation(lectureValidator.patchSection),
    lectureController.patchSection
  );

module.exports = router;
