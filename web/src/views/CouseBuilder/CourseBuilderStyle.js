import { container } from "assets/jss/material-kit-pro-react.js";
import { whiteColor } from "assets/jss/material-kit-pro-react";

export default (theme) => ({
  container,
  button: {
    fontSize: "20px",
    marginTop: "20px",
  },
  root: {
    backgroundColor: whiteColor,
    paddingTop: 180,
    paddingBottom: 50,
  },
});
