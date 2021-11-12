import { secondaryColor } from "assets/jss/material-kit-pro-react";
import { mlAuto, mrAuto } from "assets/jss/material-kit-pro-react.js";

const overviewStyle = (theme) => ({
  title: {
    color: secondaryColor[0],
    textDecoration: "none",
    textAlign: "left",
    marginBottom: 30,
    marginTop: 30,
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
  coursesContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "fit-content",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
  },
});

export default overviewStyle;
