import { secondaryColor } from "assets/jss/material-kit-pro-react";
import { mlAuto, mrAuto } from "assets/jss/material-kit-pro-react.js";

const cartStyle = (theme) => ({
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
  cartContainer: { paddingTop: 180, paddingBottom: 180 },
  cartTableContainer: { padding: 20 },
  cartContainerTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartTitle: {
    color: secondaryColor[0],
    textAlign: "center",
    marginBottom: 20,
  },
  cartSessions: {
    color: secondaryColor[0],
    textAlign: "left",
    marginBottom: 20,
  },
  noCartItemsTitle: {
    color: secondaryColor[0],
    textAlign: "center",
    marginTop: 50,
  },
  proceedButton: {
    position: "relative",
    width: 200,
    height: 41,
    fontSize: "12px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "8px 20px",
    margin: "0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      minWidth: 95,
      marginBottom: "5px",
      marginTop: "5px",
      textAlign: "left",
      fontSize: "0.75rem",
      "& > span:first-child": {
        justifyContent: "center",
      },
    },
  },
});

export default cartStyle;
