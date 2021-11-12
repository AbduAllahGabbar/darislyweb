const { generateSignature } = require("../../services/zoom");
const catchAsync = require("../../utils/catchAsync");
const path = require("path");
const { btoa, atob } = require("../../utils/encoding");

exports.joinMeeting = catchAsync(async (req, res, next) => {
  const filePath = path.join(
    path.resolve(__dirname, "../..") + "/views/zoom.ejs"
  );

  const { browserVersion, audioEncoding, uname, email } = req.query;
  const signature = await generateSignature(atob(browserVersion));
  const meetingConfig = {
    browserVersion: browserVersion, //meetingNumber
    userName: uname,
    userEmail: email,
    audioEncoding: audioEncoding, //password
    signature: btoa(signature),
    apiKey: process.env.ZOOM_API_KEY,
  };

  res.render(filePath, {
    referrer: `${process.env.WEB_APP_URL}/zoom`,
    meetingConfig: JSON.stringify(meetingConfig),
  });
});
