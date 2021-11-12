const catchAsync = require("../../utils/catchAsync");
const { Subject } = require("../../models");

/**
 * getSubjects
 * URL: /subjects
 * Method: GET
 * Response: [{id,name}]
 */

exports.getSubjects = catchAsync(async (req, res, next) => {

  let subjects = await Subject.findAll();

  subjects = subjects.map((el) => ({
    id: el.id,
    name: el.name,
  }));

  res.status(200).json(subjects);
});
