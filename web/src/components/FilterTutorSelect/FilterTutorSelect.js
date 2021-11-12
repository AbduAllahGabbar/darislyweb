import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import FilterTutorRow from "components/FilterTutorRow/FilterTutorRow";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import styles from "./filterTutorSelectStyle";

const useStyles = makeStyles(styles);

export default function FilterTutorSelect(props) {
  const {
    id,
    labelText,
    labelProps,
    error,
    success,
    imageSrc,
    placeholder,
    style,
    data,
  } = props;
  const classes = useStyles();

  const [simpleSelect, setSimpleSelect] = React.useState("0");

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const menuItems = data?.map((menuItem, index) => (
    <MenuItem
      key={`menu-item-${index}`}
      classes={{
        root: classes.selectMenuItem,
        selected: classes.selectMenuItemSelected,
      }}
      value={menuItem}
    >
      {menuItem}
    </MenuItem>
  ));
  return (
    <FilterTutorRow
      imageSrc={imageSrc}
      labelText={labelText}
      placeholder={placeholder}
      style={style}
      inputProps={
        <FormControl fullWidth className={classes.selectFormControl}>
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
            value={simpleSelect}
            onChange={handleSimple}
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
              value="0"
            >
              {placeholder}
            </MenuItem>
            {menuItems}
          </Select>
        </FormControl>
      }
    />
  );
}

FilterTutorSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
};
