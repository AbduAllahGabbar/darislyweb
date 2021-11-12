const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFICATION_SID,
} = process.env;
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.verify = twilio.verify.services(TWILIO_VERIFICATION_SID);
exports.sms = twilio.messages;
