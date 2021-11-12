import {
  cardTitle,
  container,
  grayColor,
  main,
  mainRaised,
  mlAuto,
  mrAuto,
  secondaryColor,
  whiteColor,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";
import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const studentProfileStyle = (theme) => ({
  root: {
    backgroundColor: whiteColor,
    paddingTop: 180,
  },
  container: {
    ...container,
  },
  ...imagesStyle,
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + "  !important",
  },
  cardTitle,
  profile: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: grayColor[0],
  },
  textCenter: {
    textAlign: "center !important",
  },
  main: {
    ...main,
  },
  mainRaised: {
    ...mainRaised,
  },
  title: {
    color: secondaryColor[0],
    textDecoration: "none",
    textAlign: "center",
  },
  calendarContainer: {
    position: "absolute",
    top: "20%",
    right: -100,
    fontSize: "2.2rem",
  },
  calendarIcon: {
    position: "absolute",
    top: 15,
    right: 19,
    fontSize: "2.2rem",
  },
  calendarButton: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    color: whiteColor,
  },
  button: {
    position: "relative",
    width: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "8px 40px",
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
  profileIcon: {
    color: primaryColor[0],
    fontSize: 175,
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
  collections: {
    marginTop: "20px",
  },
  cardBody: {
    display: "flex",
    boxOrient: "vertical",
    boxDirection: "normal",
    flexDirection: "column",
    boxPack: "center",
    justifyContent: "center",
  },
  badge: {
    display: "inline-table",
    margin: "0 auto",
  },
  listUnstyled: {
    paddingLeft: "0",
    listStyle: "none",
    "& > li": {
      padding: "5px 0px",
      fontSize: "1em",
    },
  },
  profileTabs: {
    marginTop: "0px",
    marginBottom: "100px",
  },
  card: {
    textAlign: "left !important",
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
  },
  parallax: {
    height: "380px",
    backgroundPosition: "top center",
  },
  statsContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
      paddingRight: 20,
    },
  },
});

export default studentProfileStyle;
