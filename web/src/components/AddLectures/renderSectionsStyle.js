import {
  dangerColor,
  secondaryColor,
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react.js";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

export default (theme) => ({
  ...tooltipsStyle,
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
  plusButton: {
    width: 0,
  },
  newSectionButton: {
    color: secondaryColor[0] + " !important",
    textTransform: "none !important",
    border: "1.5px solid !important",
  },
  addIcon: {
    color: "white !important",
    background: secondaryColor[0],
    borderRadius: "50% !important",
    marginRight: "10px !important",
  },
  addLectureButton: {
    margin: "0px 5px !important",
  },
  editLectureButton: {
    background: "#FFD700",
    margin: "0px 5px !important",
  },
  deleteSection: {
    color: whiteColor,
    textTransform: "none !important",
    border: "1.5px solid " + dangerColor[0] + " !important",
  },
  deleteIcon: {
    color: "white !important",
    background: dangerColor[0],
    borderRadius: "50% !important",
    marginRight: "10px !important",
  },
  addNewLecture: {
    // marginLeft: 'auto !important',
    color: primaryColor[0] + " !important",
    textTransform: "none !important",
    border: "1.5px solid !important",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  formControl: {
    paddingTop: 0,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
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
  addCircleIcon: {
    color: "white !important",
    background: primaryColor[0],
    borderRadius: "50% !important",
    marginRight: "10px !important",
  },
  buttonError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
    fontSize: "0.85rem",
    display: "flex",
    justifyContent: "center",
  },
  sectionTitle: {
    color: secondaryColor[0],
    fontSize: 25,
    // textAlign: 'center',
    margin: "auto",
  },
  payBySection: {
    color: secondaryColor[0],
    fontSize: 18,
    textAlign: "left",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  spaceBetweenButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonMargin: {
    marginTop: 10,
    marginBottom: 10,
  },
  deleteSectionEnd: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  deleteLectureCenter: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  newSection: {
    display: "flex",
    justifyContent: "center",
  },
  noSections: {
    backgroundColor: secondaryColor[1],
    padding: "20px",
  },
  sectionButton: {
    justifyContent: "center",
    display: "flex",
  },
});
