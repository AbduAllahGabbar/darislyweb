import { grayColor } from "assets/jss/material-kit-pro-react";
import {
  primaryColor,
  dangerColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";

const studentAnswersModalStyle = (theme) => ({
  root: {
    color: secondaryColor[0],
    maxHeight: "80vh",
    overflowY: "scroll",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    marginBottom: 20,
    maxWidth: 500,
    paddingLeft: 20,
    width: "100%",
  },
  question: {
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
    fontWeight: "bold",
  },
  // answer: {
  //   marginBottom: 5,
  //   textAlign: "left",
  // },
  questionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  modalButton: {
    width: 120,
    margin: "0px 15px",
    marginTop: 20,
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
    color: secondaryColor[0],
  },
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
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
  imageConatainer: {
    width: "100%",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  quizImage: {
    flexShrink: "0",
    maxWidth: "90%",
    maxHeight: "80%",
  },
  previewLink: {
    position: "absolute",
    bottom: "0",
    right: "0",
    cursor: "pointer",
  },
  answer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: primaryColor[6],
    width: "100%",
    border: `1px solid ${primaryColor[6]}`,
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  correctAnswerFault: {
    backgroundColor: grayColor[27],
    width: "100%",
    border: `1px solid ${grayColor[27]}`,
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  closeIcon: {
    fontSize: 20,
    color: dangerColor[0],
  },
  checklIcon: {
    fontSize: 20,
    color: primaryColor[0],
  },
  scoreButton: {
    width: 300,
    margin: "0px 15px",
    marginTop: 20,
    fontSize: 16,
    border: `2px solid ${secondaryColor[0]}`,
  },
  // #f0fdfa primary 6
  // #aeaeae gray 27
});

export default studentAnswersModalStyle;
