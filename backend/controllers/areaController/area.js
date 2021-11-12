const catchAsync = require("../../utils/catchAsync");
const { Area } = require("../../models");

/**
 * getAreas
 * URL: /cities/{cityId}/areas/{lang}
 * Method: GET
 * Response: [{id,name}]
 */

exports.getAreas = catchAsync(async (req, res, next) => {
  const { lang, cityId } = req.params;

  let areas = await Area.findAll({
    where: {
      city_id: cityId,
    },
  });

  areas = areas.map((el) => ({
    id: el.id,
    name: el.name[lang],
  }));

  res.status(200).json(areas);
});
