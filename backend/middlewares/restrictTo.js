const AppError = require("../utils/appError");
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.dataValues)
      return next(
        new AppError("You must be logged in to perform this action", 403)
      );

    if (!roles.includes(req.user.dataValues.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

module.exports = restrictTo;
