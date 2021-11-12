import {
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";

const curriculumStyle = (theme) => ({
  root: {
    marginRight: "auto",
    color: secondaryColor[0],
  },
  sectionName: {
    textAlign: "left",
    marginBottom: 20,
  },
  lectureList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lectureItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  lecturePrice: {
    marginLeft: "auto",
  },
  lectureName: {
    textAlign: "left",
  },
  lectureIcon: {
    color: primaryColor[0],
    fontSize: "1.5rem",
    marginRight: 6,
  },
});
export default curriculumStyle;
