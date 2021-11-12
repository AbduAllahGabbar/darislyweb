import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./statCardStyle.js";
import { translateNumber } from "utils/index.js";

const useStyles = makeStyles(styles);

export default function StatCard(props) {
  const classes = useStyles();
  const { sideBarColor, fontColor, value, name } = props;
  const lang = useSelector((state) => state.lang);
  const sideBarClasses = classNames({
    [classes[sideBarColor + "SideBar"]]: true,
    [classes.sideBar]: true,
  });
  const numberClasses = classNames({
    [classes[fontColor + "Number"]]: true,
    [classes.number]: true,
  });
  return (
    <div className={classes.root}>
      <span className={sideBarClasses}></span>
      <span className={numberClasses}>
        {translateNumber(value < 10 ? "0" + value : value.toString(), lang)}
      </span>
      <span className={classes.name}>{name}</span>
    </div>
  );
}

StatCard.defaultProps = {
  sideBarColor: "secondary",
  fontColor: "primary",
  name: "",
  value: 0,
};

StatCard.propTypes = {
  sideBarColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "purple",
    "rose",
  ]),
  fontColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "purple",
    "rose",
  ]),
  value: PropTypes.number,
  name: PropTypes.string,
};
