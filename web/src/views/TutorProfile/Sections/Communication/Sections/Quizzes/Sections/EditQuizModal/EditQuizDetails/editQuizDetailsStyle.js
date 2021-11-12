import {
  primaryColor,
  secondaryColor,
  whiteColor,
  dangerColor,
  blackColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react";

const editQuizDetailsStyle = (theme) => ({
  header: {
    fontSize: 20,
    marginBottom: 25,
  },
  quizDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowContainer: {
    display: "flex",
    marginBottom: 15,
    width: "100%",
  },
  label: {
    color: secondaryColor[0],
    marginTop: 3,
  },
  formControl: {
    paddingTop: 0,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  select: {
    "& .MuiInput-root": {
      border: `solid 2px ${secondaryColor[0]}`,
      borderRadius: 18,
    },
  },
  input: {
    color: secondaryColor[0],
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
  datetime: {
    "& .rdt input.form-control": {
      color: "transparent", //secondaryColor[0],
      textAlign: "center",
      backgroundImage: "none",
      border: `2px solid ${secondaryColor[0]}`,
      borderRadius: 50,
      "&::placeholder": {
        textAlign: "center",
        opacity: 0.6,
      },
    },
    "& .rdtPicker": {
      top: "unset",
      bottom: "45px !important",
      "&:after": {
        top: "unset",
        bottom: "-5px",
        borderBottom: "unset",
        borderTop: "0.4em solid #ffffff",
      },
      "&:before": {
        top: "unset",
        bottom: "-5px",
        borderBottom: "unset",
        borderTop: "0.4em solid #ffffff",
      },
    },
    "& .rdtDay.rdtActive": {
      backgroundColor: `${secondaryColor[0]} !important`,
    },
    "& .rdtYear.rdtActive": {
      backgroundColor: `${secondaryColor[0]} !important`,
    },
    "& .rdtMonth.rdtActive": {
      backgroundColor: `${secondaryColor[0]} !important`,
    },
    "& .rdtTimeToggle": {
      color: `${secondaryColor[0]} !important`,
    },
    "& th.rdtSwitch": {
      color: `${secondaryColor[0]} !important`,
    },
    "& .rdtBtn": {
      color: `${secondaryColor[0]} !important`,
    },
    "& .rdtCount": {
      color: `${secondaryColor[0]} !important`,
      border: `none !important`,
    },
  },
  datetimePickersContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  datetimePickerValue: {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    height: "100%",
    paddingTop: 5,
    overflow: "hidden",
    cursor: "pointer",
  },
  removeButton: {
    cursor: "pointer",
    position: "absolute",
    right: -35,
    top: 4,
    borderRadius: 100,
    padding: 0,
    width: 30,
    height: 30,
    backgroundColor: dangerColor[0],
    marginBottom: 10,
    marginLeft: 5,
  },
  removeIcon: {
    borderRadius: 100,
    fontSize: 30,
    color: whiteColor,
  },
  datetimeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
    fontFamily: "Ubuntu",
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  switchContainer: {
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: `${primaryColor[0]} !important`,
    },
  },
  switchBase: {
    color: primaryColor[0] + "!important",
    "&:hover": {
      backgroundColor:
        "rgba(" + hexToRgb(primaryColor[0]) + ", 0.14) !important",
    },
  },
  switchIcon: {
    boxShadow: "0 1px 3px 1px rgba(" + hexToRgb(blackColor) + ", 0.4)",
    color: whiteColor + "  !important",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
  },
  switchBar: {
    width: "30px",
    height: "15px",
    backgroundColor: "rgb(" + hexToRgb(grayColor[24]) + ")",
    borderRadius: "15px",
    opacity: "0.7!important",
  },
});

export default editQuizDetailsStyle;
