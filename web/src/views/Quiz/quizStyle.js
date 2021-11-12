import {
  mlAuto,
  mrAuto,
  container,
  whiteColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const quizeStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    // paddingTop: 180,

    paddingTop: 113,
    minHeight: "90vh",
  },
  container: {
    ...container,
  },
  button: {
    position: "relative",
    width: "100%",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "18px 40px",
    margin: "40px 0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
      fontSize: "0.85rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
  quizChoice: {
    display: "block",
    borderRadius: "30px",
    padding: "16px 24px",
    margin: "10px 0",
    backgroundColor: secondaryColor[1],
    color: secondaryColor[0],
    lineHeight: "23.5px",
    fontSize: "17px",
    boxShadow: "0 1.5px 12.5px 0 rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    textAlign: "left",
  },
  quizQuestion: {
    color: secondaryColor[0],
    fontSize: "20px",
    textAlign: "left",
    display: "block",
    margin: "20px 10px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  quizTitle: {
    color: secondaryColor[0],
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "center",
    display: "block",
    margin: "40px 10px",
  },
  choiceContainer: { display: "flex", alignItems: "center" },
  choiceRadioInput: { marginRight: 10 },
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
  questionBlock: {
    marginBottom: "30px",
    borderBottom: `1px groove ${secondaryColor[0]}`,
    paddingBottom: "30px",
  },
  timer: {
    padding: "5px",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    border: `2px solid ${secondaryColor[0]}`,
    borderRadius: "10px",
  },
  time: {
    color: secondaryColor[0],
    fontSize: "20px",
    padding: "0px 10px",
  },
  timeLabels: {
    color: secondaryColor[0],
    fontWeight: "lighter",
  },
  fixedTitleAndTimer: {
    position: "fixed",
    top: 100,
    width: "100%",
    left: 0,
    height: 200,
    backgroundColor: "white",
    zIndex: 2,
  },
  questionsContainer: { marginTop: 165 },
});

export default quizeStyle;
