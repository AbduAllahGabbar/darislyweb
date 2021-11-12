const express = require("express");
const validation = require("../middlewares/validation");
const authController = require("../controllers/authController/auth");
const authValidator = require("../controllers/authController/authValidator");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");

const router = express.Router();
require("../services/passport");

const requireSigninStudent = passport.authenticate("localLoginStudent", {
  session: true,
  failWithError: true,
});

const requireSigninTutor = passport.authenticate("localLoginTutor", {
  session: true,
  failWithError: true,
});

const requireSigninStaff = passport.authenticate("localLoginStaff", {
  session: true,
  failWithError: true,
});

const requireSignupStudent = passport.authenticate("localRegisterStudent", {
  session: true,
  failWithError: true,
});

const requireSigninAdmin = passport.authenticate("localLoginAdmin", {
  session: true,
  failWithError: true,
});

router.post(
  "/:lang/signupstudent",
  validation(authValidator.signUpStudent),
  requireSignupStudent,
  authController.signUpStudent
);

router.post(
  "/:lang/signinstudent",
  validation(authValidator.signIn),
  requireSigninStudent,
  authController.signInStudent
);

router.get(
  "/cancelsignup",
  restrictTo(UserRoles.STUDENT, UserRoles.TUTOR),
  authController.cancelSignup
);

router.post(
  "/:lang/signintutor",
  validation(authValidator.signIn),
  requireSigninTutor,
  authController.signInTutor
);

router.post(
  "/:lang/signinstaff",
  validation(authValidator.signInStaff),
  requireSigninStaff,
  authController.signInStaff
);

router.post("/signinadmin", requireSigninAdmin, authController.signInAdmin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(`${process.env.WEB_APP_URL}/signupinfo`);
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect(`${process.env.WEB_APP_URL}/signupinfo`);
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    res.redirect(`${process.env.WEB_APP_URL}/signupinfo`);
  }
);

router.get("/logout", authController.logout);

router.get("/current_user", authController.getCurrentUser);

// router.post("/phone/verify", authController.verifyPhone);

router.get("/:lang/email/verify", authController.verifyEmail);

// router.get("/phone/resendverification", authController.resendPhoneVerification);

// router.post("/forgotpassword", authController.forgotPassword);

router.put(
  "/:lang/forgotpassword",
  validation(authValidator.forgotPassword),
  authController.forgotPassword
);

router.put(
  "/resetpassword",
  validation(authValidator.resetPassword),
  authController.resetPassword
);

router.get("/checkresetpassword", authController.checkResetPassword);

router
  .route("/email/checkresend")
  .get(authController.checkResendEmailConfirmation);

// router
//   .route("/phone/checkresend")
//   .get(authController.checkResendPhoneVerification);

router.get("/email/resendconfirmation", authController.resendEmailConfirmation);

router.get(
  "/setlanguage",
  catchAsync(async (req, res, next) => {
    req.session.passport.user.lang = req.query.lang || "ar";
    res.end();
  })
);

module.exports = router;
