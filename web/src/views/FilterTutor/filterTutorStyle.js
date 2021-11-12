import {
  container,
  hexToRgb,
  lightBlueColor,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const filterTutorStyle = (theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor,
    backgroundColor: "white",
  },
  card: {
    boxShadow: "none",
    marginBottom: "100px",
    backgroundColor: "transparent",
  },
  noPadding: {
    padding: "0",
  },
  containerItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: lightBlueColor[0],
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottom: `solid 2px ${secondaryColor[0]}`,
  },
  title: {
    color: secondaryColor[0],
    fontWeight: "600",
    margin: 0,
    fontSize: 20,
  },
  gridContainerRow: {
    width: "100%",
  },
  borderRight: {
    [theme.breakpoints.up("md")]: {
      borderRight: `solid 2px ${primaryColor[0]}`,
    },
  },
  button: {
    width: "100%",
    height: 60,
    margin: 0,
    backgroundColor: primaryColor[0],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    },
  },
});

export default filterTutorStyle;
