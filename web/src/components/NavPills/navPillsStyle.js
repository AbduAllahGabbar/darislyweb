import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  whiteColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react.js";
import { secondaryColor } from "assets/jss/material-kit-pro-react";

const navPillsStyle = (theme) => ({
  root: {
    marginTop: "20px",
    marginBottom: "0",
    overflow: "visible !important",
    backgroundColor: secondaryColor[0],
    padding: "10px 30px",
    borderRadius: 100,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 10,
    },
  },
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  buttonsContainer: {
    display: "flex",
  },
  buttonsCenter: {
    justifyContent: "center",
  },
  displayNone: {
    display: "none !important",
  },
  fixed: {
    overflow: "visible !important",
  },
  horizontalDisplay: {
    display: "block",
  },
  pills: {
    float: "left",
    position: "relative",
    display: "block",
    borderRadius: "30px",
    minWidth: "100px",
    textAlign: "center",
    transition: "all .3s",
    padding: "10px 10px",
    color: whiteColor,
    backgroundColor: secondaryColor[0],
    height: "auto",
    opacity: "1",
    maxWidth: "100%",
    margin: "0 5px",
    minHeight: "unset",
    lineHeight: "24px",
    textTransform: "capitalize",
    fontSize: "1.1rem",
    fontWeight: "500",
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
  pillsWithIcons: {
    borderRadius: "4px",
  },
  tabIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "15px 0 !important",
  },
  horizontalPills: {
    width: "100%",
    float: "none !important",
    "& + button": {
      margin: "10px 0",
    },
  },
  contentWrapper: {
    marginTop: "20px",
    "& .react-swipeable-view-container > div > div": {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  },
  primary: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: primaryColor[0],
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.4)",
    },
  },
  secondary: {
    "&,&:hover": {
      color: secondaryColor[0],
      backgroundColor: whiteColor,
    },
  },
  info: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: infoColor[0],
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.4)",
    },
  },
  success: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: successColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.12)",
    },
  },
  warning: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: warningColor[0],
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.4)",
    },
  },
  danger: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.4)",
    },
  },
  rose: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: roseColor[0],
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.4)",
    },
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabelContainer: {
    padding: "unset !important",
  },
  swipeableViewContainer: {
    transition:
      "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important",
  },
});

export default navPillsStyle;
