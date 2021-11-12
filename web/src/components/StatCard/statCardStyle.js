import {
  whiteColor,
  primaryColor,
  roseColor,
  secondaryColor,
  warningColor,
} from "assets/jss/material-kit-pro-react.js";

const statCardStyle = (theme) => ({
  root: {
    // width: 210,
    minWidth: 210,
    height: 80,
    boxShadow: "0 0 33px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: whiteColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "10px 15px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  sideBar: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: 5,
  },
  number: {
    fontSize: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  name: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
    fontSize: 14,
    textAlign: "left",
  },

  primaryNumber: {
    color: primaryColor[0],
  },
  secondaryNumber: {
    color: secondaryColor[0],
  },
  warningNumber: {
    color: warningColor[8],
  },
  purpleNumber: {
    color: secondaryColor[3],
  },
  roseNumber: {
    color: roseColor[2],
  },

  primarySideBar: {
    backgroundColor: primaryColor[0],
  },
  secondarySideBar: {
    backgroundColor: secondaryColor[0],
  },
  warningSideBar: {
    backgroundColor: warningColor[8],
  },
  purpleSideBar: {
    backgroundColor: secondaryColor[3],
  },
  roseSideBar: {
    backgroundColor: roseColor[2],
  },
});

export default statCardStyle;
