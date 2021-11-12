import { secondaryColor } from "assets/jss/material-kit-pro-react.js";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

export default (theme) => ({
  ...tooltipsStyle,
  plusButton: {
    width: 0,
  },
  sectionTitle: {
    color: secondaryColor[0],
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonMargin: {
    marginTop: 20
  },
  rowContainer: { display: "flex", alignItems: "center", marginBottom: 15 },
  label: {
    color: secondaryColor[0],
    margin: 0,
    fontSize: "17px",
    textAlign: "center"
  },
  button: { width: "100%" },
  customFormControlClasses: {
    paddingTop: 0,
    width: "100%",
    // "& .MuiInput-formControl": {
    //   borderColor: secondaryColor[0],
    // },
  },
  input: { color: secondaryColor[0] },
  gridItem: {
    textAlign: "left",
  },
  buttonCenter: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 30
  },
});
