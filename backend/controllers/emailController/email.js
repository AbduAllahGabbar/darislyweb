const sendEmail = require("../../services/nodemailer");
const {
  emailVerificationBody,
  resetPasswordBody,
  contactUs,
} = require("../../utils/constants");

const { UserRoles } = require("../../enums/index");

exports.sendContactUsMessage = async (emailContact, name, message) => {
  await sendEmail({
    email: process.env.NODEMAILER_EMAIL,
    subject: contactUs.subject["en"],
    message: `Sender email: ${emailContact}\n\nSender name: ${name}\n\n${message}`,
  });
};

exports.sendVerificationEmail = async (emailContact, token, lang = "en") => {
  const hostUrl = process.env.HOST_URL;

  await sendEmail({
    email: emailContact,
    subject: emailVerificationBody.subject[lang],
    message: `${emailVerificationBody.content[lang]}: ${hostUrl}/v1/auth/${lang}/email/verify?token=${token}&email=${emailContact}`,
  });

  // const email = {
  //   to,
  //   from: {
  //     name: emailVerificationBody.name[lang],
  //     email: "support@darisly.com",
  //   },
  //   template_id: "d-36996f0d718d4b7c8497b6ec95cf5e27",
  //   dynamic_template_data: {
  //     hostUrl,
  //     token,
  //     to,
  //     lang,
  //     subject: emailVerificationBody.subject[lang],
  //     content: emailVerificationBody.content[lang],
  //     buttonTitle: emailVerificationBody.buttonTitle[lang],
  //   },
  //  }
};

exports.sendResetPasswordEmail = async (
  emailContact,
  token,
  userRole,
  lang = "en"
) => {
  const hostUrl = process.env.WEB_APP_URL;
  const role = userRole === UserRoles.STUDENT ? "student" : "tutor";

  await sendEmail({
    email: emailContact,
    subject: resetPasswordBody.subject[lang],
    message: `${resetPasswordBody.content[lang]}: ${hostUrl}/${role}/resetpassword/?lang=${lang}&token=${token}`,
  });

  // const email = {
  //   to,
  //   from: {
  //     name: resetPasswordBody.name[lang],
  //     email: "support@darisly.com",
  //   },
  //   template_id: "d-5f21bc64fe6348b1ab60c73d15f03baa",
  //   dynamic_template_data: {
  //     hostUrl,
  //     token,
  //     to,
  //     lang,
  //     role,
  //     subject: resetPasswordBody.subject[lang],
  //     content: resetPasswordBody.content[lang],
  //     buttonTitle: resetPasswordBody.buttonTitle[lang],
  //   },
  // };
};
