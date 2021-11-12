const { param } = require("express-validator");
const { City } = require("../../models");

exports.getAreas = [
  param("cityId")
    .exists({ checkFalsy: true })
    .withMessage("city is required")
    .isInt({ min: 0 })
    .withMessage("cityId must be an integer")
    .custom(async (value) => {
      const city = await City.findByPk(value);

      if (!city) return Promise.reject("There is no city with this id");
    }),

  param("lang")
    .exists({ checkFalsy: true })
    .withMessage("lang is required")
    .isLength({ min: 2, max: 2 })
    .withMessage("lang must be 2 characters long"),
];
