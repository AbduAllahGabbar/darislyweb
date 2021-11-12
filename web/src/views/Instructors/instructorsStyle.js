import {
  primaryColor,
  grayColor,
  container,
  cardTitle,
  whiteColor,
  secondaryColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react.js";

import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const instructorsStyle = (theme) => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor,
    marginTop: "30px",
    marginBottom: "30px"
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
  cardInstructors: {
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
  socials: {
    marginTop: "0",
    position: "absolute",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  textCenter: {
    textAlign: "center",
  },
  textLeft: {
    textAlign: "left",
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative",
  },
  inputAdornmentIcon: {
    color: grayColor[13],
  },
  form: {
    margin: "0",
  },
  infoArea: {
    color: whiteColor,
    maxWidth: "360px",
    padding: "0px 0px 20px !important",
    margin: "40px 100px 40px 40px",
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
    fontSize: 26,
  },
  primaryTitle: {
    fontSize: 22,
    marginTop: 30,
    color: primaryColor[0],
  },
  secondaryTitle: {
    fontSize: 26,
    marginTop: "3%",
    //fontFamily: "Ubuntu-Bold",
    color: secondaryColor[0],
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    color: grayColor[10],
    textAlign: "left",
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  left: {
    float: "left!important",
    display: "block",
    "&,& *,& *:hover,& *:focus": {
      color: whiteColor + "  !important",
    },
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
    "&,& *,& *:hover,& *:focus": {
      color: whiteColor + "  !important",
    },
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
  },
  noPadding: {
    padding: "0",
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
    textTransform: "capitalize",
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
    "& $icons": {
      marginRight: "3px",
    },
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
    "& $icons": {
      marginRight: "3px",
    },
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
  searchSpacing: {
    marginBottom: "15px"
  },
  inputSearch: {
    paddingTop: "10px"
  },
  sortButton: {
    position: "relative",
    backgroundColor: whiteColor,
    color: primaryColor[0],
    borderRadius: 150,
    border: "2px solid " + primaryColor[0],
    paddingRight: "2rem",
    paddingLeft: "2rem",
    marginLeft: "1rem",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "1rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: secondaryColor,
      borderStyle: "solid",
    },
    "& $icons": {
      marginRight: "3px",
    },
    "&, &:hover, &:focus,&:active ": {
      color: primaryColor[0],
      backgroundColor: whiteColor,
    },
  },
  dropdownButton: {
    position: "relative",
    backgroundColor: whiteColor,
    color: secondaryColor[0],
    fontWeight: "bold",
    textTransform: "none",
    lineHeight: "20px",
    textDecoration: "underline",
    margin: "0px",
    padding: "0px",
    display: "inline-flex",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: 5,
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "1.1rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: secondaryColor,
      borderStyle: "solid",
    },
    "& $icons": {
      marginRight: "3px",
    },
    "&, &:hover, &:focus,&:active ": {
      color: secondaryColor[0],
      backgroundColor: whiteColor,
    },
  },
  rowHeight: {
    marginTop: "50px"
  },
  menuItemWidthSmall: {
    minWidth: "100px",
  },
  alignCenter: {
    textAlign: "center",
  },
  inputSearchIcon: {
    padding: "10px",
    color: primaryColor[0] + " !important",
  },
  alignLeft: {
    textAlign: "left",
  },
});

export default instructorsStyle;
