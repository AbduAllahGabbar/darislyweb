import {
  primaryColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const courseCardStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    borderRadius: 35,
    height: 450,
    width: 350,
    position: "relative",
    margin: "auto",
    marginBottom: 60,
    display: "flex",
    flexDirection: "column",
    padding: "105px 40px 60px 40px",
    boxShadow: "0 1.5px 14.5px 0 rgba(0, 0, 0, 0.05)",
  },
  video: {
    borderRadius: 20,
    height: 130,
    width: 250,
    position: "absolute",
    top: -35,
    left: 50,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    // cursor: "pointer",
  },
  playIcon: {
    zIndex: 10,
    position: "absolute",
    color: whiteColor,
    top: "32%",
    left: "40%",
    fontSize: "3rem",
  },
  rating: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "& .MuiRating-root": {
      color: primaryColor[0],
    },
    "& .MuiRating-iconEmpty": {
      color: primaryColor[0],
    },
  },
  attribute: {
    color: secondaryColor[0],
    display: "flex",
    borderBottom: "solid 1px #e6e6e6",
    paddingBottom: 10,
    paddingTop: 10,
  },
  attributeIcon: {
    color: primaryColor[0],
    fontSize: "1.5rem",
    marginRight: 6,
  },
  button: {
    position: "absolute",
    bottom: -27,
    left: "20%",
    width: "60%",
    height: 54,
    fontSize: "18px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "8px 40px",
    margin: "0px",
    display: "inline-flex",
  },
  mlAuto: {
    marginLeft: "auto",
  },
  attrName: {
    textAlign: "left",
    width: "60%",
  },
});
export default courseCardStyle;
