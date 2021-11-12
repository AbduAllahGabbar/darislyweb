// const {
//   sendContactUsMessage
// } = require("../../services/sendGrid");
const { sendContactUsMessage } = require("../emailController/email");
const catchAsync = require("../../utils/catchAsync");

exports.logout = async (req, res, next) => {
  req.logout();
  res.end();
};

exports.contactUs = catchAsync(async (req, res, next) => {
  await sendContactUsMessage(req.body.email, req.body.name, req.body.message);

  res.status(200).end();
});
