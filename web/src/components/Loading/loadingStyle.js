import {
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const statCardStyle = (theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circularProgress: {
    marginTop: 17,
  },
  primary: {
    color: primaryColor[0],
  },
  secondary: {
    color: secondaryColor[0],
  },
});

export default statCardStyle;
