import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import { translateNumber } from "utils";
import styles from "./customLinearProgressStyle.js";

const useStyles = makeStyles(styles);

export default function CustomLinearProgress(props) {
  const lang = useSelector((state) => state.lang);
  const { color, completed, total, ...rest } = props;
  const value = parseInt(
    (completed / total) * 100
  );
  const classes = useStyles();
  let adjustedValue;
  if (value === 0) {
    adjustedValue = 0;
  } else if (value < 10) {
    adjustedValue = 10;
  } else {
    adjustedValue = value;
  }

  let labelShift = lang === "ar" ? 100 - adjustedValue : adjustedValue - 100;

  return (
    <div className={classes.container}>
      <div
        className={classes.progressLabel}
        style={{
          display: adjustedValue === 0 ? "none" : "block",
          transform: `translateX(${labelShift}%)`,
        }}
      >
        <span>
          {translateNumber(completed + " / " + total, lang, true)}
        </span>
      </div>
      <LinearProgress
        {...rest}
        value={adjustedValue}
        classes={{
          root: classes.root + " " + classes[color + "Background"],
          bar: classes.bar + " " + classes[color],
        }}
      >
      </LinearProgress>
    </div>
  );
}

CustomLinearProgress.defaultProps = {
  color: "gray",
};

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
};
