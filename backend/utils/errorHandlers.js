exports.errorHandler = (err, req, res, next) => {
  if (err.name === "AuthorizationError") {
    res
      .status(401)
      .json({ errors: [err.body] })
      .end();
  } else if (err.name == "ArgumentError") {
    res
      .status(400)
      .json({ errors: [err.body] })
      .end();
  } else if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    console.log(err);
    res.status(500).end();
  }
};
