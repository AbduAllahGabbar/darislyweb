const catchAsync = require("../../utils/catchAsync");
const { Center } = require("../../models");

/**
 * getCenters
 * URL: /centers
 * Method: GET
 * Response: [{id,name}]
 */

exports.getCenters = catchAsync(async (req, res, next) => {
  let centers = await Center.findAll();

  centers = centers.map((el) => ({
    id: el.id,
    name: el.name,
  }));

  res.status(200).json(centers);
});
