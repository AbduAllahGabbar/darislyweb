import {
  container,
  secondaryColor,
  whiteColor,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";
import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const tutorProfileStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    paddingTop: 180,
    paddingBottom: 100,
  },
  container: {
    ...container,
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
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
  },
  icon: {
    color: primaryColor[0],
    fontSize: 175,
  },
});

export default tutorProfileStyle;
