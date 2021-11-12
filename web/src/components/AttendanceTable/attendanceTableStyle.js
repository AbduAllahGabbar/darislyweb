import {
  grayColor,
  mlAuto,
  mrAuto,
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react";

const attendanceTableStyle = (theme) => ({
  gridItem: {
    ...mlAuto,
    ...mrAuto,
  },
  img: {
    width: "70px !important",
    height: "70px !important",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: 30,
  },
  checkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: grayColor[0],
    width: "40px !important",
    height: "40px !important",
    cursor: "pointer",
  },
  checkIcon: {
    fontSize: 48,
    color: primaryColor[0],
  },
  select: {
    border: `solid 2px ${secondaryColor[0]}`,
    borderRadius: 18,
    marginLeft: 0,
  },
  selectContainer: {
    marginLeft: 0,
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
  datetimeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: secondaryColor[1],
    padding: "2px 6px",
    marginBottom: 10,
    borderRadius: 50,
    width: 220,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "space-between",
      justifyContent: "center",
      borderRadius: 10,
      width: 170,
    },
  },
  date: {
    marginRight: 10,
    marginLeft: 10,
  },
  time: {
    padding: "5px 0px",
    marginLeft: "auto",
    width: 65,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

export default attendanceTableStyle;
