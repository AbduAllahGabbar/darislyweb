import {
  blackColor,
  dangerColor,
  grayColor,
  hexToRgb,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const paymentModalStyle = (theme) => ({
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    width: "100%",
  },
  modalButton: {
    width: "40%",
    marginTop: 20,
  },
  titleContainer: {
    color: secondaryColor[0],
    marginTop: 0,
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  modalBody: {
    color: secondaryColor[0],
    fontSize: 16,
    textAlign: "center",
  },
  checkIcon: {
    fontSize: 90,
    color: primaryColor[0],
  },
  cancelIcon: {
    fontSize: 90,
    color: dangerColor[0],
  },
  rowContainer: {
    display: "flex",
    marginBottom: 15,
    width: "100%",
  },
  select: {
    "& .MuiInput-root": {
      border: `solid 2px ${secondaryColor[0]}`,
      borderRadius: 18,
    },
  },
  label: {
    color: secondaryColor[0],
    marginTop: 3,
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

export default paymentModalStyle;
