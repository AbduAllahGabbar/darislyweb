import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// core components
import styles from "./selectInputStyle";

const useStyles = makeStyles(styles);

export default function SelectInput(props) {
  const {
    id,
    labelText,
    labelProps,
    error,
    success,
    placeholder,
    selectStyle,
    data,
    value,
    onSelect,
    errorMessage,
    valid
  } = props;

  const classes = useStyles();

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const [simpleSelect, setSimpleSelect] = React.useState("0");

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const menuItems = data?.map((menuItem, index) => (
    <MenuItem
      key={`menu-item-${index}`}
      classes={{
        root: classes.selectMenuItem,
        selected: classes.selectMenuItemSelected,
      }}
      value={menuItem.value}
    >
      {menuItem.name}
    </MenuItem>
  ));

  return (
    <FormControl
      fullWidth
      className={classes.selectFormControl + " " + selectStyle}
      error={valid}
    >
      {labelText !== undefined ? (
        <InputLabel
          shrink={true}
          className={classes.labelRoot + " " + labelClasses}
          htmlFor="simple-select"
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        disableUnderline
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        value={value}
        onChange={onSelect}
        inputProps={{
          name: "simpleSelect",
          id: `simple-select-${id}`,
          classes: {
            icon: classes.icon,
          },
        }}
      >
        <MenuItem
          disabled
          classes={{
            root: classes.selectMenuItem,
          }}
          value={0}
        >
          {placeholder}
        </MenuItem>
        {menuItems}
      </Select>
      <FormHelperText
        id="component-error-text"
        className={classes.labelRootError}
      >
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
}

SelectInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
