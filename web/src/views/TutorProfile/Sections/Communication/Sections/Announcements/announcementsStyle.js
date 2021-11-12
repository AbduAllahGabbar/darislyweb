import { secondaryColor } from "assets/jss/material-kit-pro-react";

const announcementsStyle = (theme) => ({
  gridItem: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  selectRow: {
    margin: "20px 0px",
  },
  label: {
    color: secondaryColor[0],
    margin: 0,
    marginBottom: 15,
    fontSize: 24,
    textAlign: "left",
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
    marginTop: 20,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: { color: secondaryColor[0] },
  marginTop: {
    marginTop: 40,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});

export default announcementsStyle;
