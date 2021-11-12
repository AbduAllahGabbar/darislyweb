import { secondaryColor } from "assets/jss/material-kit-pro-react";
import { whiteColor } from "assets/jss/material-kit-pro-react";
import { dangerColor } from "assets/jss/material-kit-pro-react";

const quizzesStyle = (theme) => ({
  root: {
    color: secondaryColor[0],
    marginTop: 20,
  },
  gridItem: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  header: {
    marginBottom: 20,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  quizzesLabel: {
    textAlign: "left",
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
  },
  button: {
    width: 150,
    padding: 6,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  quizCard: {
    minWidth: 175,
    margin: "15px 10px",
    width: "fit-content",
    height: "fit-content",
    boxShadow: "0 1.5px 25px 0 rgba(0, 0, 0, 0.15)",
    backgroundColor: secondaryColor[1],
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px 20px",
  },
  quizzesContainer: {
    flexWrap: "wrap",
    padding: "20px 0px",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "fit-content",
  },
  datetimeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: secondaryColor[1],
    padding: "2px 6px",
    marginBottom: 10,
    borderRadius: 50,
    width: 220,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "space-between",
      justifyContent: "center",
      borderRadius: 10,
      width: 170,
    },
  },
  date: {
    marginRight: 10,
    marginLeft: 10,
  },
  time: {
    padding: "5px 0px",
    marginLeft: "auto",
    width: 65,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  removeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 32,
    width: 32,
    fontSize: 22,
    color: dangerColor[0],
    backgroundColor: whiteColor,
    cursor: "pointer",
    transition: "0.5s all",
    "&:hover": {
      backgroundColor: dangerColor[0],
      color: whiteColor,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0px 10px",
    },
  },
  editContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 32,
    width: 32,
    fontSize: 22,
    backgroundColor: whiteColor,
    color: "#FFD700",
    cursor: "pointer",
    transition: "0.5s all",
    "&:hover": {
      backgroundColor: "#FFD700",
      color: whiteColor,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0px 10px",
    },
  },
  viewContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 32,
    width: 32,
    fontSize: 22,
    color: secondaryColor[0],
    backgroundColor: whiteColor,
    cursor: "pointer",
    transition: "0.5s all",
    "&:hover": {
      backgroundColor: secondaryColor[0],
      color: whiteColor,
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0px 10px",
    },
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
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
  },
  message: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
    color: secondaryColor[0],
    marginBottom: 29,
  },
});

export default quizzesStyle;
