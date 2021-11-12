import {
  container,
  mlAuto,
  mrAuto,
  secondaryColor,
  primaryColor,
} from "assets/jss/material-kit-pro-react.js";

const courseSingleStyle = (theme) => ({
  root: {
    paddingTop: 180,
    paddingBottom: 160,
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundColor: secondaryColor[1],
  },
  container: {
    ...container,
  },
  titleContainer: {
    marginBottom: 80,
  },
  coursetitle: {
    color: secondaryColor[0],
    margin: 0,
    marginBottom: 3,
    textDecoration: "none",
    textAlign: "center",
    alignSelf: "flex-end",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
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
  center: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  flexEnd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  flexStart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  usersIcon: {
    color: secondaryColor[0],
  },
  enrolledStudents: {
    color: secondaryColor[0],
    fontSize: 12,
    marginTop: 1,
    marginLeft: 8,
  },
  //slkajdlkslkajdklsajdlkasjdjlkaslkdjljkdsjklsdj
  instructor: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 40,
    width: "fit-content",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  about: {
    width: "100%",
    textAlign: "left",
    color: secondaryColor[0],
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
    marginLeft: 40,
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
  },
  numberFont: {
    textAlign: "right",
    color: secondaryColor[0],
  },
});

export default courseSingleStyle;
