import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react.js";
import { whiteColor } from "assets/jss/material-kit-pro-react";
import { secondaryColor } from "assets/jss/material-kit-pro-react";

const customLinearProgressStyle = (theme) => ({
  container: {
    height: "50px",
    overflow: "hidden",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor[1],
    padding: "0 10px",
    position: "relative"
  },
  root: {
    height: "30px",
    overflow: "hidden",
    borderRadius: 50,
    width: "100%",
  },
  bar: {
    height: "30px",
    borderRadius: 50,
  },
  primary: {
    backgroundColor: primaryColor[0],
  },
  warning: {
    backgroundColor: warningColor[0],
  },
  danger: {
    backgroundColor: dangerColor[0],
  },
  success: {
    backgroundColor: successColor[0],
  },
  info: {
    backgroundColor: infoColor[0],
  },
  rose: {
    backgroundColor: roseColor[0],
  },
  gray: {
    backgroundColor: grayColor[0],
  },
  primaryBackground: {
    background: "transparent",
  },
  warningBackground: {
    background: "rgba(" + hexToRgb(warningColor[0]) + ", 0.2)",
  },
  dangerBackground: {
    background: "rgba(" + hexToRgb(dangerColor[0]) + ", 0.2)",
  },
  successBackground: {
    background: "rgba(" + hexToRgb(successColor[0]) + ", 0.2)",
  },
  infoBackground: {
    background: "rgba(" + hexToRgb(infoColor[0]) + ", 0.2)",
  },
  roseBackground: {
    background: "rgba(" + hexToRgb(roseColor[0]) + ", 0.2)",
  },
  grayBackground: {
    background: "rgba(" + hexToRgb(grayColor[6]) + ", 0.2)",
  },
  progressLabel: {
    position: "absolute",
    zIndex: 1,
    right: "20px", 
    display: "flex",
    width: "calc(100% - 20px)",
    textAlign: "right",
    // padding: "0 35px",
    "& span": {
      width: "100%",
      color: whiteColor,
      // [theme.breakpoints.down("sm")]: {
      //   color: "transparent",
      // },
    },
  },
});

export default customLinearProgressStyle;
