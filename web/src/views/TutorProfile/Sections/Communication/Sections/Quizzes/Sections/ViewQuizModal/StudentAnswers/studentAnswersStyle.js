import {
  grayColor,
  primaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react";
import { secondaryColor } from "assets/jss/material-kit-pro-react.js";

const studentAnswersStyle = (theme) => ({
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
  header: {
    fontSize: 16,
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: primaryColor[1],
    borderRadius: 10,
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
    maxWidth: 500,
    paddingLeft: 20,
    borderBottom: "1px dashed",
    width: "100%",
  },
  question: {
    marginBottom: 5,
    textAlign: "left",
  },
  answer: {
    marginBottom: 5,
    textAlign: "left",
  },
  questionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default studentAnswersStyle;
