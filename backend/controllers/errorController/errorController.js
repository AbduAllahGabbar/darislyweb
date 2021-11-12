const AppError = require("../../utils/appError");

const handleJWTError = () => {
  return new AppError(`Invalid login token, please login again`, 401);
};

const handleJWTExpiredError = () => {
  return new AppError(`Your login token has expired. Please login again`, 401);
};

const handleBodyParserError = (err) => {
  return new AppError(`The body content is invalid: ${err.message}`, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.error("Error!: ", err);

    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = {
      ...err,
    };

    error.message = err.message;

    if (error.name === "JsonWebTokenError") error = handleJWTError();
    else if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError();
    else if (
      error.type === "entity.parse.failed" &&
      error.message.includes("in JSON at position")
    )
      error = handleBodyParserError(error);
    sendErrorProd(error, res);
  }
};
