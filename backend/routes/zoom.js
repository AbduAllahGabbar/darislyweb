const express = require("express");
const zoomController = require("../controllers/zoomController/zoom")

const router = express.Router();

router
    .route("/meeting")
    .get(zoomController.joinMeeting);

module.exports = router;