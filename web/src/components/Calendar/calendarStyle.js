import {
  grayColor,
  secondaryColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const calendarStyle = (theme) => ({
  calendarStyling: {
    width: "500px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    "& a": {
      color: secondaryColor[0],
    },
    "& .fc-theme-standard td, .fc-theme-standard th, .fc-theme-standard .fc-scrollgrid": {
      borderColor: "transparent !important",
    },
    // height: "600px",
    // width: "500px",
    "& .fc .fc-daygrid-body-natural .fc-daygrid-day-events": {
      marginBottom: 0,
    },
    "& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events": {
      minHeight: "1em",
    },
    "& .fc .fc-daygrid-day-top": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .fc .fc-cell-shaded, .fc .fc-day-disabled": {
      background: "transparent",
    },
    "& .fc .fc-button-primary": {
      color: secondaryColor[0],
      backgroundColor: whiteColor,
      borderColor: whiteColor,
      margin: "0em 0.5em",
    },
    "& .fc .fc-button-primary:disabled": {
      color: whiteColor,
      display: "none",
    },
    "& .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active": {
      color: secondaryColor[0],
      backgroundColor: whiteColor,
      borderColor: whiteColor,
    },
    "& .fc .fc-button-primary:focus": {
      boxShadow: "0 0 0 0.2rem " + whiteColor,
    },
    "& .fc .fc-button-primary:not(:disabled):active:focus, .fc .fc-button-primary:not(:disabled).fc-button-active:focus": {
      boxShadow: "0 0 0 0.2rem " + whiteColor,
    },
    "& .fc .fc-button-group > .fc-button:hover": {
      backgroundColor: grayColor[17],
    },
    "& .fc-today-button": {
      visibility: "hidden",
      display: "none",
    },
    "& .fc .fc-toolbar-title": {
      fontSize: "1.3em",
      color: secondaryColor[0],
      marginLeft: "192px",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0",
      },
    },
    "& .fc-daygrid-event": {
      position: "absolute",
      width: "50px",
      bottom: "-8px",
      height: "50px",
      borderRadius: "50%",
      margin: "0",
      backgroundColor: secondaryColor[0],
      borderColor: secondaryColor[0],
      zIndex: 100,
      [theme.breakpoints.down("sm")]: {
        width: "30px",
        bottom: "2px",
        height: "30px",
      },
    },
    "& .fc .fc-daygrid-event-harness": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      visibility: "visible !important",
      cursor: "pointer",
    },
    "& .fc-daygrid-block-event .fc-event-time, .fc-daygrid-block-event .fc-event-title": {
      position: "unset",
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      color: "white",
      fontSize: "1.1em",
      [theme.breakpoints.down("sm")]: {
        marginTop: "0px",
      },
    },
    "& .fc .fc-daygrid-day.fc-day-today": {
      backgroundColor: whiteColor,
    },
    "& .fc .fc-col-header-cell-cushion": {
      paddingBottom: "10px",
    },
    "& .fc .fc-scroller-liquid-absolute": {
      overflow: "hidden !important",
      [theme.breakpoints.down("sm")]: {
        overflow: "hidden scroll !important",
      },
    },
    "& .fc .fc-scrollgrid-section-body table, .fc .fc-scrollgrid-section-footer table": {
      marginTop: "10px",
    },
  },
  shiftCalendarTitle: {
    "& .fc .fc-toolbar-title": {
      marginLeft: "280px ",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0",
      },
    },
  },
});

export default calendarStyle;
