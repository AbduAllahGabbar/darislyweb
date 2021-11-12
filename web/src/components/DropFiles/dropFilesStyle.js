import {
  dangerColor,
  secondaryColor,
  primaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

export default (theme) => ({
  container: { cursor: "pointer" },
  uploadIcon: {
    color: "#DEDEDE",
    background: whiteColor,
    height: 100,
    width: 100,
  },
  deleteIcon: { color: dangerColor[0], cursor: "pointer" },
});
