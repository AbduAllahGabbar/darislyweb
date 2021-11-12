import { secondaryColor } from "assets/jss/material-kit-pro-react";
import {
  dangerColor,
  defaultFont,
  grayColor,
  primaryColor,
  successColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  labelRoot: {
    ...defaultFont,
    color: secondaryColor[0] + " !important",
    fontWeight: "500",
    fontSize: "25px",
    lineHeight: "1.42857",
    top: "10px",
    fontFamily: "Ubuntu",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
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
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[13],
    },
    "& .MuiInput-formControl": {
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 18,
      borderColor: primaryColor[0],
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
      color: grayColor[12],
    },
    textAlign: "center",
    fontFamily: "Ubuntu",
    color: primaryColor[0],
    borderRadius: "inherit",
    // boxShadow: `0 0 0 30px transparent inset !important`, // -webkit-box-shadow
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
    // marginTop: 20,
    letterSpacing: "unset",
    fontFamily: "Ubuntu",
    textAlign: "start",
    margin: "14px 0px"
  },
};

export default customInputStyle;
