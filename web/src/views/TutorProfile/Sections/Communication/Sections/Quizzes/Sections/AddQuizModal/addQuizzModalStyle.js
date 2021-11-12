import {
  secondaryColor,
  dangerColor,
} from "assets/jss/material-kit-pro-react.js";
import { whiteColor } from "assets/jss/material-kit-pro-react";
import { primaryColor } from "assets/jss/material-kit-pro-react";
import { grayColor } from "assets/jss/material-kit-pro-react";

const addQuizzModalStyle = (theme) => ({
  root: {
    color: secondaryColor[0],
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "5px 10px",
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      alignself: "flex-end",
    },
  },
  modalButton: {
    width: 120,
    margin: "0px 15px",
    marginTop: 20,
    fontSize: 16,
  },
  modalBody: {
    maxHeight: "70vh",
    overflow: "scroll",
    color: secondaryColor[0],
    fontSize: 16,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "60vh",
    },
  },
  quizTypeButton: {
    width: 160,
    height: 160,
    borderRadius: 10,
    boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: secondaryColor[1],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    margin: 15,
    transition: "0.3s all",
    "&:hover": {
      color: whiteColor,
      backgroundColor: primaryColor[0],
      cursor: "pointer",
    },
  },
  quizTypeButtonDisabled: {
    width: 160,
    height: 160,
    borderRadius: 10,
    backgroundColor: grayColor[2],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    margin: 15,
    transition: "0.3s all",
    cursor: "not-allowed",
  },
  quizTypeIcon: {
    width: 85,
    height: 85,
  },
  quizTypeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
  },
  quizDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    color: secondaryColor[0],
    marginTop: 0,
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
  },
  checkCircleIcon: {
    fontSize: 90,
    color: primaryColor[0],
  },
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
  },
  message: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
    color: secondaryColor[0],
  },
});

export default addQuizzModalStyle;
