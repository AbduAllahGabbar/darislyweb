import { secondaryColor, dangerColor } from "assets/jss/material-kit-pro-react";

const selectInputStyle = {
  selectFormControl: { textAlign: "center" },
  select: {
    color: secondaryColor[0],
    paddingRight: "0 !important",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
  },
};

export default selectInputStyle;
