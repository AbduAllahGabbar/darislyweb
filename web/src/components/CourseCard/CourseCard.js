import { makeStyles } from "@material-ui/core/styles";
import mathematicsIcon from "assets/images/mathematics.png";
import React from "react";
import styles from "./courseCardStyle.js";

const useStyles = makeStyles(styles);

export default function CourseCard(props) {
  const classes = useStyles();
  // const {} = props;
  return (
    <div className={classes.root}>
      {/* <img src={mathematicsIcon} alt="..." className={classes.image} /> */}
      <span className={classes.title}>Maths</span>
    </div>
  );
}
