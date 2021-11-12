const { param } = require("express-validator");
const validator = require("validator");

exports.getCities = [
  param("lang")
    .exists({ checkFalsy: true })
    .withMessage("lang is required")
    .isLength({ min: 2, max: 2 })
    .withMessage("lang must be 2 characters long"),
];
