exports.email = {
  required: {
    en: "Email is required",
    ar: "البريد الالكتروني مطلوب",
  },
  invalid: {
    en: "Please enter a valid email",
    ar: "من فضلك أدخل بريد إلكتروني صحيح",
  },
  invalidLength: {
    en: "Email should not exceed 50 characters long",
    ar: "البريد الإلكتروني يجب أن لا يتعدي ٥٠ حرف",
  },
  exists: {
    en: "Email already exists, please pick a different one",
    ar: "البريد الإلكتروني موجود بالفعل، يرجى اختيار بريد آخر",
  },
  notExists: {
    en: "Email does not exist",
    ar: "البريد إلإلكتروني غير موجود",
  },
};

exports.username = {
  required: {
    en: "Username is required",
    ar: "اسم المستخدم مطلوب",
  },
  invalidLength: {
    en: "Username should not exceed 20 characters long",
    ar: "اسم المستخدم يجب أن لا يتعدي ٢٠ حرف",
  },
  notExists: {
    en: "Username does not exist",
    ar: "اسم المستخدم غير موجود",
  },
};

exports.password = {
  required: {
    en: "Password is required",
    ar: "كلمة السر مطلوبة",
  },
  invalid: {
    en:
      "Passwords should be at least 8 characters long, maximum 60 characters and contain a mixture of letters, numbers, and other characters.",
    ar:
      "كلمة السر يجب أن تكون مكونة من ٨ أحرف على الأقل و ٦٠ حرف بحد أقصى و تحتوي على حروف و أرقام",
  },
  wrong: {
    en: "Wrong password",
    ar: "كلمة السر غير صحيحة",
  },
  unchanged: {
    en: "The old password and new password must not be the same",
    ar: "كلمة السر القديمة و الجديدة يجب أن يكونوا مختلفين",
  },
  useSocialAccount: {
    en: "Please sign in with your social account",
    ar: "من فضلك سجل دخولك من حساب التواصل الإجتماعي المستخدم",
  },
};

exports.firstName = {
  required: {
    en: "First Name is required",
    ar: "الاسم مطلوب",
  },
  invalidLength: {
    en: "First Name should not exceed 20 characters long",
    ar: "الاسم يجب أن لا يتعدي ٢٠ حرف",
  },
};

exports.lastName = {
  required: {
    en: "Last Name is required",
    ar: "اللقب مطلوب",
  },
  invalidLength: {
    en: "Last Name should not exceed 20 characters long",
    ar: "اللقب يجب أن لا يتعدي ٢٠ حرف",
  },
};

exports.phone = {
  required: {
    en: "Phone is required",
    ar: "الموبايل مطلوب",
  },
  invalidLength: {
    en: "Phone should not exceed 15 characters long",
    ar: "الموبايل يجب أن لا يتعدي ١٥ رقم",
  },
  invalid: {
    en: "Please enter a valid phone",
    ar: "من فضلك أدخل رقم صحيح",
  },
  exists: {
    en: "Phone already exists, please pick a different one",
    ar: "الموبايل موجود بالفعل، يرجى اختيار رقم آخر",
  },
};

exports.countryCode = {
  required: {
    en: "Country code is required",
    ar: "رمز الهاتف الدولي مطلوب",
  },
  invalid: {
    en: "Invalid country code",
    ar: "رمز الهاتف الدولي غير صحيح",
  },
};

exports.country = {
  required: {
    en: "Country is required",
    ar: "الدولة مطلوبة",
  },
  invalid: {
    en: "Invalid country",
    ar: "الدولة غير صحيحة",
  },
};

exports.verificationCode = {
  required: {
    en: "Verification code is required",
    ar: "رمز التحقق مطلوب",
  },
  invalidLength: {
    en: "Verification Code should be 4 characters long",
    ar: "رمز التحقق يجب أن يكون أربعة أرقام فقط",
  },
  invalid: {
    en:
      "The verification code you entered expired or invalid, please try again",
    ar: "رمز التحقق الذي أدخلته خطأ أو انتهت صلاحيته، يرجى المحاولة مرة أخرى",
  },
};

exports.resetPasswordToken = {
  invalid: {
    en: "This link is invalid or expired",
    ar: "هذا الرابط غير صحيح أو انتهت صلاحيته",
  },
};
