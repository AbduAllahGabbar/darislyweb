const catchAsync = require("../../utils/catchAsync");
const { City, Area } = require("../../models");

/**
 * getCities
 * URL: /cities/{lang}
 * Method: GET
 * Response: [{id,name}]
 */

exports.getCities = catchAsync(async (req, res, next) => {
  let cities = await City.findAll({
    include: {
      model: Area,
      as: "areas",
      attributes: ["id", "name"],
      required: true,
    },
  });

  res.status(200).json(cities);
});
