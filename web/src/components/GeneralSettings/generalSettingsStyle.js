import {
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const generalSettingsStyle = {
  formControl: {
    paddingTop: 0,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
  rowContainer: { display: "flex", marginBottom: 15 },
  label: {
    color: secondaryColor[0],
    margin: 0,
  },
  phoneInputStyle: { width: "100%" },
  select: { border: `solid 2px ${secondaryColor[0]}`, borderRadius: 18 },
  button: { width: "100%" },
  gridItem: {
    textAlign: "left",
  },
  smallTitle: {
    fontSize: 14,
    color: secondaryColor[0],
  },
  disabledInput: {
    textAlign: "center",
    borderRadius: 100,
    border: `2px solid ${secondaryColor[0]}`,
    backgroundColor: secondaryColor[1],
    color: secondaryColor[0],
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    marginTop: 17,
    color: primaryColor[0],
  },
};

export default generalSettingsStyle;
