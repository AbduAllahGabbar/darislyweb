import {
  secondaryColor,
  primaryColor,
  blackColor,
  hexToRgb,
  dangerColor,
} from "assets/jss/material-kit-pro-react.js";
import { whiteColor } from "assets/jss/material-kit-pro-react";

const enrollModalStyle = (theme) => ({
  modalRoot: {
    maxHeight: "70vh",
    overflow: "scroll",
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
  selectOneMessage: {
    color: dangerColor[0],
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
  liveButton: {
    width: 120,
    height: 100,
    borderRadius: 10,
    padding: 0,
    margin: 20,
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
  groupContainer: {
    backgroundColor: secondaryColor[1],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderRadius: 10,
    margin: "20px 0px",
    cursor: "pointer",
    transition: "0.3s all",
    "&:hover": {
      backgroundColor: secondaryColor[0],
      color: whiteColor,
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  cenetrSelecter: {
    backgroundColor: primaryColor[0] + " !important",
    color: whiteColor,
  },
  weekDaysContainer: {
    display: "flex",
    alignItems: "flex-end;",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      alignItems: "flex-start",
    },
  },
  weekDayContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  weekDay: {
    marginRight: 10,
  },
  locationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  location: {
    textAlign: "left",
    marginBottom: 5,
    fontSize: 18,
  },
  done: {
    color: primaryColor[0],
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      marginBottom: 5,
      paddingBottom: 5,
      borderBottom: "1px dashed #ccc",
    },
  },
  sectionContainer: {
    width: 600,
    backgroundColor: secondaryColor[1],
    padding: "10px 15px",
    borderRadius: 10,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "10px 0px",
    },
  },
  sessionsList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 3,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  lectureTitleContainer: {
    display: "flex",
    alignItems: " flex-start",
    justifyContent: "flex-start",
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  sessionDateTime: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },
  lectureName: {
    textAlign: "left",
  },
  sectionTitle: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #CCC",
    display: "flex",
    alignItems: "center",
  },
  sectionName: {
    textAlign: "left",
  },
  selectAllSection: {
    marginLeft: "auto",
  },
  selectAllContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    marginRight: 15,
  },
  lectureIcon: {
    color: primaryColor[0],
    fontSize: "1.5rem",
    marginRight: 6,
  },
  sessionDate: {
    marginRight: 15,
  },
  checkRoot: {
    padding: "14px",
    "&:hover": {
      backgroundColor:
        "rgba(" + hexToRgb(primaryColor[0]) + ", 0.14) !important",
    },
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", 0.84)",
    borderRadius: "3px",
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
  },
  priceContainer: {
    color: secondaryColor[0],
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
  },
  price: {
    color: primaryColor[0],
  },
  sessionDateTimeContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      marginTop: 10,
      width: "100%",
    },
  },
  dateTimeAndCheckbox: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      borderBottom: "1px dashed #CCC",
      marginBottom: 15,
    },
  },
  checkCircleIcon: {
    fontSize: 90,
    color: primaryColor[0],
  },
  orderPlaced: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
    color: secondaryColor[0],
  },
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
  },
});

export default enrollModalStyle;
