import {
  container,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const signUpInfoStyle = (theme) => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor,
  },
  paddingText: {
    [theme.breakpoints.down("sm")]: {
      padding: 20,
    },
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
  },
  cardSignup: {
    boxShadow: "none",
    marginBottom: "100px",
    backgroundColor: "transparent",
  },
  noPadding: {
    padding: "0",
  },
  cardInfo: {
    backgroundColor: secondaryColor[0],
  },
  infoArea: {
    color: whiteColor,
    maxWidth: "360px",
    padding: "0px 0px 20px !important",
    margin: "40px 100px 40px 40px",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      margin: "40px auto",
    },
  },
  infoAreaLink: {
    "&,& *,&:hover,&:focus": {
      cursor: "pointer",
      color: primaryColor[0],
      textDecoration: "underline",
      fontWeight: "bold",
    },
  },
  titleFont: {
    fontSize: 25,
  },
  cardInputs: {
    backgroundColor: secondaryColor[1],
  },
  textCenter: {
    textAlign: "center",
  },
  inputAdornment: {
    position: "relative",
  },
  form: {
    margin: "0",
  },
  codeSelect: {
    borderRadius: 0,
    borderTop: 0,
    borderBottom: 0,
    paddingLeft: 5,
  },
  verticalPadding: {
    padding: "25px 0",
  },
  circularProgress: { marginTop: 17, color: primaryColor[0] },
  lineHeight: {
    lineHeight: "30px",
  },
  cancelSignUpContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    color: primaryColor[0],
    cursor: "pointer",
    "&:hover": {
      color: primaryColor[0],
      textDecoration: "underline",
    },
  },
});

export default signUpInfoStyle;
