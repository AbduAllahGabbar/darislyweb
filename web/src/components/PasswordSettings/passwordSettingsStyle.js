import { secondaryColor } from "assets/jss/material-kit-pro-react.js";

const passwordSettingsStyle = {
  rowContainer: { display: "flex", alignItems: "center", marginBottom: 15 },
  label: {
    color: secondaryColor[0],
    margin: 0,
  },
  button: { width: "100%" },
  passwordFormControl: {
    paddingTop: 0,
    width: "100%",
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
  gridItem: {
    textAlign: "left",
    overflow: "hidden",
  },
};

export default passwordSettingsStyle;
