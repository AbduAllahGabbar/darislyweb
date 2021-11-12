import { secondaryColor } from "assets/jss/material-kit-pro-react";
import {
  dangerColor,
  defaultFont,
  grayColor,
  successColor,
} from "assets/jss/material-kit-pro-react.js";

const filterTutorSelectStyle = {
  labelRoot: {
    ...defaultFont,
    color: secondaryColor[0] + " !important",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    fontFamily: "Ubuntu",
    letterSpacing: "unset",
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
  },
  labelRootSuccess: {
    color: successColor[0] + " !important",
  },
  formControl: {
    paddingTop: "27px",
    width: "100%",
    position: "relative",
    marginLeft: 15,
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[13],
    },
    "& .MuiInput-formControl": {
      marginTop: 30,
    },
  },
  selectFormControl: { marginLeft: 20 },
  select: {
    fontSize: 15,
    marginTop: 10,
    color: secondaryColor[0],
    textAlign: "left",
  },
  icon: { fill: secondaryColor[0] },
};

export default filterTutorSelectStyle;
