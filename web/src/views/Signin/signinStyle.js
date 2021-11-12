import {
  cardTitle,
  container,
  grayColor,
  hexToRgb,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";
import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const signinStyle = (theme) => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor,
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
  },
  cardSignin: {
    boxShadow: "none",
    marginBottom: "100px",
    backgroundColor: "transparent",
  },
  cardTitle: {
    ...cardTitle,
    textDecoration: "none",
    textAlign: "center !important",
    marginBottom: "0.75rem",
  },
  ...customCheckboxRadioSwitchStyle,
  textCenter: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  form: {
    margin: "0",
  },
  infoArea: {
    color: whiteColor,
    maxWidth: "400px",
    lineHeight: "30px",
    // padding: "0px 0px 20px !important",
    margin: "40px 100px 40px 40px",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      margin: "40px auto",
    },
  },
  signin: {
    color: primaryColor[0],
    marginBottom: "60px",
  },
  infoAreaLink: {
    "&,& *,&:hover,&:focus": {
      cursor: "pointer",
      color: primaryColor[0],
      textDecoration: "underline",
      fontWeight: "bold",
    },
  },
  titleFont: {
    fontSize: 25,
  },
  noPadding: {
    padding: "0",
  },
  paddingText: {
    [theme.breakpoints.down("sm")]: {
      padding: 20
    }
  },
  cardInfo: {
    backgroundColor: secondaryColor[0],
  },
  cardInputs: {
    backgroundColor: secondaryColor[1],
  },
  buttonFilled: {
    position: "relative",
    float: "right !important",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: primaryColor[0],
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
    // "& $icons": {
    //   marginRight: "3px",
    // },
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    },
  },
  buttonOutlined: {
    position: "relative",
    float: "right !important",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    textTransform: "capitalize",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    color: primaryColor[0],
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: primaryColor[0],
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
    // "& $icons": {
    //   marginRight: "3px",
    // },
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(grayColor[2]) + ", 0.8)",
      color: primaryColor[0],
    },
    "&:focus": {
      color: primaryColor[0],
    },
  },
  rowContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  socials: {
    position: "absolute",
    left: "15px",
    fontSize: "1.1rem",
  },
  customFormControlClasses: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  },
  forgotPasswordContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  forgotPasswordLink: {
    color: primaryColor[0],
    "&:hover": {
      color: primaryColor[0],
    },
  },
});

export default signinStyle;
