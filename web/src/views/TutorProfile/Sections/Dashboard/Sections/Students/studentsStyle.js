import {
  mlAuto,
  mrAuto,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const studentsStyle = (theme) => ({
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
});

export default studentsStyle;
