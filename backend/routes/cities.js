const express = require("express");
const cityController = require("../controllers/cityController/city");
const cityValidator = require("../controllers/cityController/cityValidator");
const areaController = require("../controllers/areaController/area");
const areaValidator = require("../controllers/areaController/areaValidator");
const validation = require("../middlewares/validation");

const router = express.Router();

router
  .route("/:cityId/areas/:lang")
  .get(validation(areaValidator.getAreas), areaController.getAreas);

router.route("/").get(cityController.getCities);

module.exports = router;
