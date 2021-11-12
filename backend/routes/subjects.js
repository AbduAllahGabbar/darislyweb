const express = require("express");
const subjectController = require("../controllers/subjectController/subject");

const router = express.Router();

router
  .route("/")
  .get(subjectController.getSubjects);

module.exports = router;
