import {
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const courseInstructorsStyle = (theme) => ({
  gridItem: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  instructor: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 40,
    width: "fit-content",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  about: {
    width: "100%",
    textAlign: "left",
    color: secondaryColor[0],
  },
  rating: {
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
  instructorHeader: {
    width: "fit-content",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  instructorInfo: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    marginLeft: 25,
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      margin: 0,
    },
  },
  flexRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
  },
  name: {
    color: secondaryColor[0],
    textDecoration: "none",
    margin: 0,
    marginBottom: 5,
    textAlign: "left",
  },
  subtitle: {
    color: secondaryColor[0],
    textDecoration: "none",
    margin: 0,
    marginRight: 15,
  },
  cardHeader: {
    color: secondaryColor[0],
  },
  img: {
    width: "120px !important",
    height: "120px !important",
    borderRadius: "50%",
    objectFit: "cover",
  },
  numberFont: {
    textAlign: "right",
    color: secondaryColor[0],
  },
  icon: {
    color: primaryColor[0],
    fontSize: 100,
  },
});
export default courseInstructorsStyle;
