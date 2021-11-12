const quickEmailVerification = require("quickemailverification")
  .client(process.env.QUICK_EMAIL_VERIFICATION_API_KEY)
  .quickemailverification();

exports.validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    quickEmailVerification.verify(email, (err, response) => {
      if (err) {
        return reject({
          error: true,
          message: err,
        });
      }
      return resolve(response.body.result === "valid");
    });
  });
};
