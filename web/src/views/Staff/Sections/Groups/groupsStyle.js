import {
  mlAuto,
  mrAuto,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";
import { primaryColor } from "assets/jss/material-kit-pro-react";

const groupsStyle = (theme) => ({
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
  img: {
    width: "70px !important",
    height: "70px !important",
    borderRadius: "50%",
    objectFit: "cover",
  },
  selectRow: {
    margin: "20px 0px",
  },
  label: {
    color: secondaryColor[0],
    margin: 0,
    fontSize: 16,
  },
  labelContainer: {
    marginRight: 0,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
  },
  select: {
    border: `solid 2px ${secondaryColor[0]}`,
    borderRadius: 18,
    marginLeft: 0,
  },
  selectContainer: {
    marginLeft: 0,
  },
  formControl: {
    paddingTop: 0,
    marginTop: 10,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
    marginLeft: 10,
  },
  link: {
    // textDecoration: "underline",
    cursor: "pointer",
    color: primaryColor[0],
  },
  breadcrumbLink: {
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      color: secondaryColor[0],
    },
  },
  justtifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: "50%",
  },
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
  button: {
    position: "relative",
    width: "100%",
    height: 30,
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "8px 12px",
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
  groupInfo: {
    color: secondaryColor[0],
    paddingTop: 9,
  },
  groupInfoContainer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 25,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
      marginLeft: 30,
    },
  },
  icon: {
    color: primaryColor[0],
    fontSize: 75,
  },
  weekDayContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: secondaryColor[1],
    padding: "2px 6px",
    marginBottom: 10,
    borderRadius: 50,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  weekDay: {
    marginRight: 10,
    marginLeft: 10,
  },
  time: {
    padding: "5px 10px",
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      alignself: "flex-end",
    },
  },
});

export default groupsStyle;
