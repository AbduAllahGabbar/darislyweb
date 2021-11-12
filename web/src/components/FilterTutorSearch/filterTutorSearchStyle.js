import { secondaryColor } from "assets/jss/material-kit-pro-react";
import {
  dangerColor,
  defaultFont,
  grayColor,
  successColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const filterTutorSearchStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
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
  feedback: {
    position: "absolute",
    bottom: "4px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none",
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
      marginTop: 0,
    },
  },
  input: {
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1",
    },
    "&::placeholder": {
      color: secondaryColor[0],
    },
    textAlign: "left",
    fontFamily: "Ubuntu",
    color: secondaryColor[0],
  },
  whiteInput: {
    "&,&::placeholder": {
      color: whiteColor,
      opacity: "1",
    },
  },
  descriptionRoot: {
    color: secondaryColor[0] + " !important",
    fontSize: 14,
    lineHeight: "1.42857",
    marginTop: 20,
    letterSpacing: "unset",
    fontFamily: "Ubuntu",
    textAlign: "start",
  },
};

export default filterTutorSearchStyle;
