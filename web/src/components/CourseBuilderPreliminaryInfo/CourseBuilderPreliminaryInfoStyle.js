import {
  whiteColor,
  secondaryColor,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";
import { container } from "assets/jss/material-kit-pro-react";
import { grayColor } from "assets/jss/material-kit-pro-react";

export default (theme) => ({
  container,
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  img: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    marginRight: 20,
    float: "left",
    color: primaryColor[0],
  },
  teacher: {
    fontSize: 13, 
    color: secondaryColor[0], 
    float: "left"
  },
  teacherName: {
    fontSize: 18, 
    color: secondaryColor[0],
    float: "left"
  },
  // textArea: {
  //   width: "100%",
  //   marginTop: 50,
  //   color: secondaryColor[0],
  //   borderRadius: 10,
  //   padding: 10,
  //   borderColor: secondaryColor[0],
  //   borderWidth: 2,
  // },
  textAreaFormControl: {
    paddingTop: 12,
    paddingBottom: 12,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
      borderRadius: 10,
      borderWidth: 1.5
    },
  },
  textArea: {
    color: secondaryColor[0],
    height: "unset",
    "&,&::placeholder": {
      color: secondaryColor[0],
      fontSize: "15px",
      textAlign: 'left',
      textIndent: "20px",
      marginTop: "20px",
      marginBottom: "20px"

    },
    "&::placeholder": {
      color: secondaryColor[0],
      textAlign: "left",
      // paddingLeft: "20px"
    },
  },
  centerDropdown: {
    display: "flex",
    justifyContent: "center"
  },
  dropdownButton: {
    backgroundColor: secondaryColor[0],
    color: whiteColor,
    borderRadius: 150,
    border: "2px solid " + secondaryColor[0],
    paddingRight: "3.5rem",
    paddingLeft: "3.5rem",
    marginLeft: "0px",
    fontSize: "17.5px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: secondaryColor[0],
      borderStyle: "solid",
    },
    "& $icons": {
      marginRight: "0px",
    },
    "&, &:hover, &:focus,&:active ": {
      color: whiteColor,
      backgroundColor: secondaryColor[0],
    },
  },
  disableButton: {
    backgroundColor: grayColor[0],
    color: whiteColor,
    borderRadius: 150,
    border: "2px solid " + grayColor[0],
    paddingRight: "3.5rem",
    paddingLeft: "3.5rem",
    marginLeft: "0px",
    fontSize: "17.5px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
      marginLeft: 0,
      borderWidth: 0.5,
      borderColor: grayColor[0],
      borderStyle: "solid",
    },
    "& $icons": {
      marginRight: "0px",
    },
    "&, &:hover, &:focus,&:active ": {
      color: whiteColor,
      backgroundColor: grayColor[0],
    },
  }
});
