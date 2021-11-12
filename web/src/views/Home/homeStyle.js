import {
  container,
  description,
  grayColor,
  mlAuto,
  mrAuto,
  secondaryColor,
  title,
  whiteColor,
  primaryColor,
} from "assets/jss/material-kit-pro-react.js";

const homeStyle = (theme) => ({
  mlAuto,
  mrAuto,
  video: {
    borderRadius: 20,
    height: "250px",
    width: "550px",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
      width: "300px",
    },
  },
  playIcon: {
    zIndex: 10,
    position: "absolute",
    top: "40%",
    left: "47%",
    color: whiteColor,
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
      left: "45%",
      fontSize: "2.5rem",
    },
  },
  imageSize: {
    width: "132px",
    height: "115px",
    marginTop: "15px",
  },
  becomeStudentParagraph: {
    fontSize: "12px",
    lineHeight: 1.43,
    color: grayColor[26],
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  becomeStudentHeader: {
    textAlign: "left",
  },
  applyButton: {
    display: "flex",
  },
  addIcon: {
    marginRight: "10px !important",
    marginLeft: "-10px !important",
  },
  centerImage: {
    display: "flex",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 60,
  },
  centerPartner: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  centerStudentParagraph: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  title: {
    ...title,
    color: secondaryColor[0],
  },
  description: {
    ...description,
    color: secondaryColor[0],
  },
  centerText: {
    textAlign: "center",
  },
  courseStepsTitle: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "5vh",
    paddingBottom: "5vh",
    color: secondaryColor[0],
  },
  termBody: {
    margin: "30px",
  },
  termsHeader: {
    zIndex: "10",
    color: secondaryColor[0],
    textAlign: "center",
    paddingTop: "28vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25vh",
    },
  },
  viewCourses: {
    marginLeft: "auto !important",
    // color: primaryColor[0] + " !important",
    border: "1.5px solid !important",
    padding: "12px 0px",
    width: 140,
    borderColor: `${primaryColor[0]} !important`,
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  addCircleIcon: {
    color: "white !important",
    background: primaryColor[0],
    borderRadius: "50% !important",
    // borderColor: primaryColor[0],
    marginRight: "10px !important",
  },
  marginButtons: {
    marginTop: 20,
    marginBottom: 20,
  },
  pageHeader: {
    minHeight: "550px",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
  },
  startLearning: {
    marginLeft: "auto !important",
    color: primaryColor[0] + " !important",
    border: "1.5px solid !important",
    padding: "12px 0px",
    width: 140,
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  startLearningIcon: {
    marginRight: "10px !important",
  },
  secondaryColor: {
    color: secondaryColor[0],
  },
  iconBorder: {
    width: "90px",
    height: "90px",
    border: "solid 8px rgba(39, 60, 102, 0.07)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerMargin: {
    marginTop: 10,
    fontSize: "3rem",
  },
  marginTopSteps: {
    marginTop: 80,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  stepsCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default homeStyle;
