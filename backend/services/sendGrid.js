const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const {
  emailVerificationBody,
  resetPasswordBody,
  contactUs
} = require("../utils/constants");
const UserRoles = require("../enums").UserRoles;

exports.sendVerificationEmail = async (to, token, lang = "en") => {
  const hostUrl = process.env.HOST_URL;
  const email = {
    to,
    from: {
      name: emailVerificationBody.name[lang],
      email: "support@darisly.com",
    },
    template_id: "d-36996f0d718d4b7c8497b6ec95cf5e27",
    dynamic_template_data: {
      hostUrl,
      token,
      to,
      lang,
      subject: emailVerificationBody.subject[lang],
      content: emailVerificationBody.content[lang],
      buttonTitle: emailVerificationBody.buttonTitle[lang],
    },
  };

  sgMail.send(email);
};

exports.sendResetPasswordEmail = async (to, token, userRole, lang = "en") => {
  const hostUrl = process.env.WEB_APP_URL;
  const role = userRole === UserRoles.STUDENT ? "student" : "tutor";
  const email = {
    to,
    from: {
      name: resetPasswordBody.name[lang],
      email: "support@darisly.com",
    },
    template_id: "d-5f21bc64fe6348b1ab60c73d15f03baa",
    dynamic_template_data: {
      hostUrl,
      token,
      to,
      lang,
      role,
      subject: resetPasswordBody.subject[lang],
      content: resetPasswordBody.content[lang],
      buttonTitle: resetPasswordBody.buttonTitle[lang],
    },
  };

  sgMail.send(email);
};

exports.sendContactUsMessage = async (emailContact, name, message) => {
  const email = {
    to: "support@darisly.com",
    from: {
      name: contactUs.name["en"],
      email: "support@darisly.com",
    },
    template_id: "d-99253db6d866424c90fc4ff5f6bf9794",
    dynamic_template_data: {
      email: "Sender email: " + emailContact,
      name: "Sender name: "+ name,
      message: message,
      subject: contactUs.subject["en"],
    },
  };

  sgMail.send(email);
};