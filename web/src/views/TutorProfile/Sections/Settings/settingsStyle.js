import {
    mlAuto,
    mrAuto
} from "assets/jss/material-kit-pro-react.js";


const settingsStyle = (theme) => ({
  button: {
    position: "relative",
    width: "80%",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "8px 20px",
    margin: "0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
});

export default settingsStyle;
