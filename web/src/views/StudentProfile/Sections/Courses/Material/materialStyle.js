import {
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";

const materialStyle = (theme) => ({
  gridItem: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  selectRow: {
    margin: "20px 0px",
  },
  label: {
    color: secondaryColor[0],
    margin: 0,
    marginBottom: 15,
    fontSize: 24,
    textAlign: "left",
  },
  labelContainer: {
    marginRight: 0,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
  },
  select: {
    border: `solid 2px ${secondaryColor[0]}`,
    borderRadius: 18,
    marginLeft: 0,
  },
  selectContainer: {
    marginLeft: 0,
  },
  formControl: {
    paddingTop: 0,
    marginTop: 20,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
  marginTop: {
    marginTop: 40,
  },
  button: {
    width: 120,
  },
  uploadModalButton: { display: "flex", justifyContent: "center" },
  select: {
    "& .MuiInput-root": {
      border: `solid 2px ${secondaryColor[0]}`,
      borderRadius: 18,
    },
    width: "50%",
    marginBottom: 10,
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
  message: {
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
    color: secondaryColor[0],
  },
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
  marginRight: {
    marginRight: 15,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  successButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export default materialStyle;
