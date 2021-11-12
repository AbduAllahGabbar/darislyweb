exports.emailVerificationBody = {
  name: {
    en: "Darisly",
    ar: "درسلي",
  },
  subject: {
    en: "Welcome to Darisly! Confirm Your Email",
    ar: "مرحباً بك في درسلي! من فضلك قم بتأكيد بريدك الإلكتروني",
  },
  content: {
    en:
      "By clicking on the following link, you are confirming your email address.",
    ar: "بالضغط على الرابط التالي، سيتم التحقق من بريدك الإلكتروني",
  },
  buttonTitle: {
    en: "Confirm Email Address",
    ar: "التحقق من البريد الإلكتروني",
  },
};

exports.emailVerificationLink = {
  welcomeToDarisly: {
    en: "Welcome to Darisly",
    ar: "مرحباً بك في درسلي",
  },
  alreadyVerified: (email) => {
    return {
      en: `Your email '${email}' has already been verified`,
      ar: `من قبل '${email}' لقد تم إلتحقق من بريدك`,
    };
  },
  verificationSuccess: {
    en: "Your email has been verified successfully.",
    ar: "لقد تم التحقق من بريدك الإلكتروني بنجاح",
  },
  verificationLinkExpired: {
    en: "This verification link has been expired.",
    ar: "لقد نفذت صلاحية هذا الرابط",
  },
  notFound: (email) => {
    return {
      en: `Email '${email}' was not found.`,
      ar: `غير موجود '${email}' البريد الإلكتروني`,
    };
  },
  thankYou: {
    en: "Thank you!",
    ar: "! شكراً",
  },
};

exports.contactUs = {
  name: {
    en: "Darisly",
    ar: "درسلي",
  },
  subject: {
    en: "Received Contact Us Message",
    ar: 'تم استلام رسالة "اتصل بنا"',
  },
};

exports.resetPasswordBody = {
  name: {
    en: "Darisly",
    ar: "درسلي",
  },
  subject: {
    en: "Reset password",
    ar: "تغيير كلمة السر",
  },
  content: {
    en: "Click on the following link to reset your password",
    ar: "إضغط على الرابط التالي لتغيير كلمة السر",
  },
  buttonTitle: {
    en: "Reset Password",
    ar: "تغيير كلمة السر",
  },
};

exports.awsBucketUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;
