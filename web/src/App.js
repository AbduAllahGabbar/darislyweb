import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import enums from "enums";
import { createBrowserHistory } from "history";
import { create } from "jss";
import rtl from "jss-rtl";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import EmailConfirmation from "views/EmailConfirmation/EmailConfirmation";
import ForgotSucceed from "views/ForgotSucceed/ForgotSucceed";
import Instructors from "views/Instructors/Instructors";
import ResetPassword from "views/ResetPassword/ResetPassword";
import ResetPasswordSucceed from "views/ResetPasswordSucceed/ResetPasswordSucceed";
import ForgotPassword from "views/ForgotPassword/ForgotPassword";
import TutorProfile from "views/TutorProfile/TutorProfile";
// import VerifyPhone from "views/VerifyPhone/VerifyPhone";
import "./assets/scss/material-kit-pro-react.scss?v=1.9.0";
import { fetchUser, getCartItems } from "./store/actions";
import AboutUs from "./views/AboutUs/AboutUs";
import ContactUs from "./views/ContactUs/ContactUs";
import CourseSingle from "./views/CourseSingle/CourseSingle";
import FilterTutor from "./views/FilterTutor/FilterTutor";
import Home from "./views/Home/Home";
import Signin from "./views/Signin/Signin";
import SigninTutor from "./views/SigninTutor/SigninTutor";
import SigninStaff from "./views/SigninStaff/SigninStaff";
import Signup from "./views/Signup/Signup";
import SignUpInfo from "./views/SignUpInfo/SignUpInfo";
import StudentProfile from "./views/StudentProfile/StudentProfile";
import TermsAndConditions from "./views/TermsAndConditions/TermsAndConditions";
import CourseBuilder from "views/CouseBuilder/CourseBuilder";
import Staff from "./views/Staff/Staff";
import Payment from "./views/Payment/Payment";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import WhyDarisly from "./views/WhyDarisly/WhyDarisly";
import FAQ from "./views/FAQ/FAQ";
import Loading from "components/Loading/Loading";
import ZoomMeeting from "views/ZoomMeeting/ZoomMeeting";
import VideoLecture from "views/VideoLecture/VideoLecture";
import Cart from "views/Cart/Cart";
import OrderSummary from "views/OrderSummary/OrderSummary";
import Quiz from "views/Quiz/Quiz";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

var hist = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      await dispatch(fetchUser());
      setLoading(false);
    };
    getCurrentUser();
  }, [dispatch]);

  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (currentUser?.role === enums.UserRoles.STUDENT) {
        dispatch(getCartItems());
      }
    })();
  }, [currentUser]);

  let routes;

  const commonRoutes = [
    <Route key={0} path="/contactus" component={ContactUs} />,
    <Route key={1} path="/aboutus" component={AboutUs} />,
    <Route key={2} path="/termsofuse" component={TermsAndConditions} />,
    <Route key={3} path="/privacypolicy" component={PrivacyPolicy} />,
    <Route key={4} path="/whydarisly" component={WhyDarisly} />,
    <Route key={5} path="/faq" component={FAQ} />,
    <Route key={6} path="/instructors" component={Instructors} />,
    <Route key={7} path="/coursesingle" component={CourseSingle} />,
    <Route key={8} exact path="/home" component={Home} />,
  ];

  const publicRoutes = [
    <Route
      key={9}
      path={["/student/forgotpassword", "/tutor/forgotpassword"]}
      component={ForgotPassword}
    />,
    <Route
      key={10}
      path={["/student/resetpassword", "/tutor/resetpassword"]}
      component={ResetPassword}
    />,
    <Route
      key={11}
      path="/resetpasswordsucceed"
      component={ResetPasswordSucceed}
    />,
    <Route key={12} path="/forgotsucceed" component={ForgotSucceed} />,
    <Route key={13} path="/signin" component={Signin} />,
    <Route key={14} path="/signupinfo" component={SignUpInfo} />,
    <Route key={15} path="/signintutor" component={SigninTutor} />,
    <Route key={16} path="/signinstaff" component={SigninStaff} />,
    <Route key={17} path="/signup" component={Signup} />,
    <Route key={18} exact path="/" component={Home} />,
    [...commonRoutes],
  ];

  if (currentUser?.role === enums.UserRoles.STUDENT) {
    routes = (
      <Switch>
        <PrivateRoute path="/signupinfo" component={SignUpInfo} />
        {/* <PrivateRoute path="/verifyphone" component={VerifyPhone} /> */}
        <PrivateRoute path="/emailconfirmation" component={EmailConfirmation} />
        <PrivateRoute path="/resetpassword" component={ResetPassword} />
        <PrivateRoute path="/filtertutor" component={FilterTutor} />
        <PrivateRoute exact path="/" component={StudentProfile} />
        <PrivateRoute path="/pay" component={Payment} />
        <PrivateRoute path="/zoom" component={ZoomMeeting} />
        <PrivateRoute path="/videolecture" component={VideoLecture} />
        <PrivateRoute path="/cart" component={Cart} />
        <PrivateRoute path="/ordersummary" component={OrderSummary} />
        <PrivateRoute path="/quiz" component={Quiz} />
        {commonRoutes}
        {!currentUser.emailVerified // || !currentUser.phoneVerified
          ? publicRoutes
          : null}
        <Redirect to="/" />
      </Switch>
    );
  } else if (currentUser?.role === enums.UserRoles.TUTOR) {
    routes = (
      <Switch>
        <Route path="/tutorprofile" component={TutorProfile} />
        <Route path="/coursebuilder" component={CourseBuilder} />
        <Route exact path="/" component={TutorProfile} />
        {commonRoutes}
        <Redirect to="/" />
      </Switch>
    );
  } else if (currentUser?.role === enums.UserRoles.STAFF) {
    routes = (
      <Switch>
        <Route exact path="/" component={Staff} />
        {commonRoutes}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = publicRoutes;
  }

  const lang = useSelector((state) => state.lang);
  const theme = createMuiTheme({
    direction: lang === "en" ? "ltr" : "rtl",
  });
  document.body.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Router history={hist}>
          <Header
            loading={loading}
            fixed
            color="secondary"
          />
          <Loading
            loading={loading}
            style={{ paddingTop: 113, height: "90vh" }}
          >
            <Switch>{routes}</Switch>
          </Loading>
          <Footer />
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
