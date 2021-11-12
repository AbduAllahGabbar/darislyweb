var nodemailer = require("nodemailer");

/**
 * Responsible for sending generic emails to any email using the email stored in env vars
 * @param {Object} options
 * @param {String} options.email    The email to be sent to
 * @param {String} options.subject  The subject of the email
 * @param {String} options.message     The body of the email
 */

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_EMAIL,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
      accessToken: process.env.NODEMAILER_ACCESS_TOKEN,
      expires: process.env.NODEMAILER_EXPIRY_DATE,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (e) {
    console.log(e);
  }
};
