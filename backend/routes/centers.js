const express = require("express");
const centerController = require("../controllers/centerController/center");

const router = express.Router();

router.route("/").get(centerController.getCenters);

module.exports = router;
