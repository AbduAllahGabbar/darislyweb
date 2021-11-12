import {
  container,
  whiteColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const videoLectureStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    paddingTop: 180,
    minHeight: "90vh",
  },
  container: {
    ...container,
  },
  button: {
    position: "relative",
    width: "100%",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "18px 40px",
    margin: "40px 0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
      fontSize: "0.85rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
  },
  iframe: {
    borderRadius: "10px",
    marginTop: "40px",
    height: "500px",
    width: "100%",
    background: "#18262F linear-gradient(to bottom, #18262F, #141517)",
    [theme.breakpoints.down("xs")]: {
      height: "200px",
    },
  },
  center: {
    position: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "37.5px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    color: secondaryColor[0],
    textAlign: "center",
  },
  subtitle: {
    fontSize: "25px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    color: secondaryColor[0],
  },
  text: {
    fontSize: "25px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.34",
    letterSpacing: "normal",
    textAlign: "center",
    color: secondaryColor[0],
  },
});

export default videoLectureStyle;
