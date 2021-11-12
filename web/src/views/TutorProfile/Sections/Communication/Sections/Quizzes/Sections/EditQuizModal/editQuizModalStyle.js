import {
  dangerColor,
  hexToRgb,
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";

const editQuizModalStyle = (theme) => ({
  root: {
    color: secondaryColor[0],
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
  gridItem: {
    padding: 0,
  },
  header: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  addQuestionsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: "80vh",
    overflowY: "scroll",
  },
  modalButton: {
    width: 120,
    margin: "0px 15px",
    marginTop: 20,
    fontSize: 16,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    paddingTop: 0,
    width: "100%",
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  answerFormControl: {
    paddingTop: 0,
    width: "100%",
    "& .MuiInput-formControl": {
      border: "none",
      borderBottom: `1px solid rgba(${hexToRgb(secondaryColor[0])})`,
      borderRadius: 0,
    },
  },
  input: {
    color: secondaryColor[0],
  },
  questionsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  questionContainer: {
    width: "100%",
    borderBottom: `1px dashed rgba(${hexToRgb(secondaryColor[0])})`,
    paddingBottom: 15,
    marginBottom: 15,
  },
  question: {
    width: "100%",
  },
  label: {
    color: secondaryColor[0],
    marginTop: 3,
    paddingLeft: 6,
  },
  rowContainer: {
    display: "flex",
    margin: 0,
    marginBottom: 15,
    width: "100%",
  },
  answerContainer: {
    display: "flex",
    margin: 0,
    width: "100%",
  },
  addIconContainer: {
    paddingLeft: 7,
    display: "flex",
    alignItems: "center",
  },
  addIcon: {
    color: primaryColor[0],
    fontSize: 30,
    marginBottom: 3,
    cursor: "pointer",
  },
  checkRoot: {
    padding: "14px",
    "&:hover": {
      backgroundColor:
        "rgba(" + hexToRgb(primaryColor[0]) + ", 0.14) !important",
    },
  },
  answer: {
    paddingRight: 50,
    paddingLeft: 10,
    paddingTop: 5,
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  checkedIcon: {
    width: "25px",
    height: "25px",
    border: "1px solid rgba(" + hexToRgb(secondaryColor[0]) + ", 0.84)",
    borderRadius: "100px",
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "12.5px",
    border: "1px solid rgba(" + hexToRgb(secondaryColor[0]) + ", .54)",
    borderRadius: "100px",
  },
  removeIcon: {
    fontSize: 30,
    marginBottom: 3,
    color: dangerColor[0],
    cursor: "pointer",
  },
});

export default editQuizModalStyle;
