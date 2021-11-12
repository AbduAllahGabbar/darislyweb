import { secondaryColor } from "assets/jss/material-kit-pro-react";

const quizStudentsStyle = (theme) => ({
  formControl: {
    paddingTop: 0,
    "& .MuiInput-formControl": {
      borderColor: secondaryColor[0],
    },
  },
  input: {
    color: secondaryColor[0],
  },
  rowContainer: {
    display: "flex",
    marginBottom: 15,
    alignItems: "center",
    marginRight: 0,
  },
  sortContainer: {
    marginLeft: 18,
    marginRight: 0,
    display: "flex",
    alignItems: "center",
  },
  // select: {
  //   "& .MuiInput-root": {
  //     border: `solid 2px ${secondaryColor[0]}`,
  //     borderRadius: 18,
  //   },
  // },
});

export default quizStudentsStyle;
