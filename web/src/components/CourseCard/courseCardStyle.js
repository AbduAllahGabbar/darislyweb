import { primaryColor, whiteColor } from "assets/jss/material-kit-pro-react.js";

const courseCardStyle = (theme) => ({
  root: {
    width: 175,
    height: 175,
    boxShadow: "0 1.5px 23.5px 0 rgba(0, 0, 0, 0.07)",
    borderRadius: 25,
    backgroundColor: whiteColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
    padding: 20,
    margin: 20,
  },
  image: {
    width: 75,
    height: 75,
    objectFit: "cover",
    borderRadius: "50%",
  },
  title: {
    fontSize: 25,
    color: primaryColor[0],
  },
});

export default courseCardStyle;
