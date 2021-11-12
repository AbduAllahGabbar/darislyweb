import {
  secondaryColor,
  whiteColor,
  dangerColor,
  primaryColor,
  hexToRgb,
  blackColor,
  grayColor,
} from "assets/jss/material-kit-pro-react";

const addQuestionsStyle = (theme) => ({
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
  inputPadding: {
    padding: "0px 4px",
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
  zeroMargin: {
    margin: 0,
  },
  attachmentIcon: {
    cursor: "pointer",
    transform: "rotate(45deg)",
  },
  imageUpload: {
    width: "100%",
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
  removeIconDisabled: {
    fontSize: 30,
    marginBottom: 3,
    color: grayColor[0],
  },
  viewContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 32,
    width: 32,
    fontSize: 22,
    marginBottom: 4,
    color: secondaryColor[0],
    backgroundColor: whiteColor,
    cursor: "pointer",
    transition: "0.5s all",
  },
  popover: {
    padding: "0",
    boxShadow:
      "0 16px 24px 2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 6px 30px 5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    lineHeight: "1.5em",
    background: "rgba(" + hexToRgb(grayColor[15]) + ",0.9)",
    border: "none",
    borderRadius: "3px",
    display: "block",
    maxWidth: "300px",
    fontWeight: "400",
    textAlign: "start",
    textDecoration: "none",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
    fontSize: "0.875rem",
    wordWrap: "break-word",
  },
  popoverBody: {
    padding: "10px 15px 15px",
    lineHeight: "1.4",
    color: whiteColor,
  },
});

export default addQuestionsStyle;
