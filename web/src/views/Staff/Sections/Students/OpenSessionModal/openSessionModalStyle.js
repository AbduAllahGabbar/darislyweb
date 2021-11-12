import {
    mlAuto,
    mrAuto,
    secondaryColor,
    primaryColor,
    dangerColor,
  } from "assets/jss/material-kit-pro-react.js";
  
  const openSessionModalStyle = (theme) => ({
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
      width: "fit-content",
      marginRight: 20,
      textAlign: "left",
      display: "flex",
      justifyContent: "center",
      alignItems: "centr",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginBottom: 5,
        marginRight: 0,
        textAlign: "center",
      },
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
      justifyContent: "space-around",
    },
    button: {
      width: "45%",
    },
    modalButton: {
      width: "40%",
      marginTop: 20,
    },
    titleContainer: {
      color: secondaryColor[0],
      marginTop: 0,
      marginBottom: 20,
      textAlign: "center",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    modalBody: {
      color: secondaryColor[0],
      fontSize: 16,
      textAlign: "center",
    },
    checkIcon: {
      fontSize: 90,
      color: primaryColor[0],
    },
    cancelIcon: {
      fontSize: 90,
      color: dangerColor[0],
    },
    searchContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    customFormControlClasses: {
      width: 200,
      marginRight: 20,
      marginBottom: 7,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: 0,
      },
    },
    searchButton: {
      width: 200,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    icon: {
      color: primaryColor[0],
      fontSize: 75,
    },
    videoViewed: {
      fontWeight: "bold",
      color: "green",
    },
    videoClosed: {
      fontWeight: "bold",
      color: "red",
    },
  });
  
  export default openSessionModalStyle;
  