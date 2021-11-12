import { secondaryColor } from "assets/jss/material-kit-pro-react";
import { grayColor } from "assets/jss/material-kit-pro-react.js";

const filterTutorRowStyle = {
  formControl: {
    paddingTop: "27px",
    width: "100%",
    position: "relative",
    marginLeft: 15,
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[13],
    },
    "& .MuiInput-formControl": {
      marginTop: 30,
    },
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: secondaryColor[1],
    height: 60,
  },
};

export default filterTutorRowStyle;
