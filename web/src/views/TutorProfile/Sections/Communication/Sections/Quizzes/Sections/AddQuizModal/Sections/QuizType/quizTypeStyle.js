import {
  grayColor,
  primaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react";
import { secondaryColor } from "assets/jss/material-kit-pro-react.js";

const quizTypeStyle = (theme) => ({
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  modalButton: {
    width: 120,
    margin: "0px 15px",
    marginTop: 20,
    fontSize: 16,
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
});

export default quizTypeStyle;
