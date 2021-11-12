import {
  container,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";
import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const staffStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    paddingTop: 180,
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 960px)": {
      maxWidth: "1050px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1350px",
    },
  },
  ...imagesStyle,
  profile: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: secondaryColor[0],
    textDecoration: "none",
    textAlign: "center",
  },
  profileTabs: {
    marginTop: "0px",
    marginBottom: "100px",
  },
});

export default staffStyle;
