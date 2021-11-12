// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// core components
import styles from "./filterTutorRowStyle";

const useStyles = makeStyles(styles);

export default function FilterTutorRow(props) {
  const { inputProps, imageSrc, style, iconSrc } = props;
  const classes = useStyles();

  return (
    <GridItem
      xs={12}
      sm={12}
      md={12}
      className={classes.itemContainer}
      style={style}
    >
      <img src={imageSrc} alt="" width={35}></img>
      {inputProps}
      {iconSrc ? <img src={iconSrc} alt="" width={20}></img> : null}
    </GridItem>
  );
}

FilterTutorRow.propTypes = {
  inputProps: PropTypes.object,
};
