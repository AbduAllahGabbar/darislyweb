import { dangerColor } from "assets/jss/material-kit-pro-react";

export default (theme) => ({
  button: {
    fontSize: "18px",
    marginTop: "20px",
  },
  buttonError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
    fontSize: "0.85rem",
    display: "flex",
    justifyContent: "center",
  },
});
