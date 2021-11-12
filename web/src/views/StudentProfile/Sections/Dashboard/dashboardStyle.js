import { secondaryColor } from "assets/jss/material-kit-pro-react";
import {
  mlAuto,
  mrAuto,
  primaryColor,
  hexToRgb,
} from "assets/jss/material-kit-pro-react.js";

const dashboardStyle = (theme) => ({
  background: {
    backgroundColor: secondaryColor[1],
    padding: "20px",
    borderRadius: "15px",
    marginTop: 30,
  },
  headerMargin: {
    marginTop: "10px",
  },
  iconColor: {
    color: primaryColor[0] + " !important",
    fontSize: "34px",
  },
  gridItemEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  gridItemStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  button: {
    "& .MuiButton-label": {
      fontWeight: "bold",
    },
  },
  title: {
    color: secondaryColor[0],
    textDecoration: "none",
    textAlign: "left",
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto,
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
  skeleton: {
    "& .MuiSkeleton-root": {
      backgroundColor: secondaryColor[1],
    },
    "& .MuiSkeleton-wave::after": {
      background: `linear-gradient(90deg, transparent, rgba(${hexToRgb(
        secondaryColor[0]
      )}, 0.05), transparent)`,
    },
  },
});

export default dashboardStyle;
