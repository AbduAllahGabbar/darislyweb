import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./loadingStyle.js";

const useStyles = makeStyles(styles);

export default function Loading(props) {
  const classes = useStyles();
  const { loading, color, children, style, iconStyle } = props;
  const loadingClasses = classNames({
    [classes[color]]: true,
    [classes.circularProgress]: true,
  });

  return (
    <div className={loading ? classes.root : ""} style={loading ? style : {}}>
      {loading ? (
        <CircularProgress
          className={loadingClasses}
          style={iconStyle}
        />
      ) : (
        children
      )}
    </div>
  );
}

Loading.defaultProps = {
  color: "primary",
  loading: false,
};

Loading.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
  loading: PropTypes.bool,
};
