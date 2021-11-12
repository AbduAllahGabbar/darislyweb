import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import FilterTutorRow from "components/FilterTutorRow/FilterTutorRow";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import styles from "./filterTutorSearchStyle";

const useStyles = makeStyles(styles);

export default function FilterTutorSearch(props) {
  const {
    formControlProps,
    labelText,
    descriptionText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    valid,
    errorMessage,
    imageSrc,
    placeholder,
    style,
    iconSrc,
  } = props;
  const classes = useStyles();
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  let newInputProps = {
    maxLength: inputProps ? inputProps.maxLength : undefined,
    minLength: inputProps ? inputProps.minLength : undefined,
  };
  return (
    <FilterTutorRow
      imageSrc={imageSrc}
      labelText={labelText}
      placeholder={placeholder}
      iconSrc={iconSrc}
      style={style}
      inputProps={
        <FormControl
          {...formControlProps}
          className={formControlClasses}
          error={valid}
        >
          {labelText !== undefined ? (
            <InputLabel
              shrink={true}
              className={classes.labelRoot + " " + labelClasses}
              htmlFor={id}
              {...labelProps}
            >
              {labelText}
            </InputLabel>
          ) : null}
          {descriptionText !== undefined ? (
            <p className={classes.descriptionRoot}>{descriptionText}</p>
          ) : null}
          <Input
            classes={{
              input: inputClasses,
              root: marginTop,
              disabled: classes.disabled,
            }}
            id={id}
            inputProps={newInputProps}
            disableUnderline={true}
            placeholder={placeholder}
          />
          <FormHelperText
            id="component-error-text"
            className={classes.labelRootError}
          >
            {errorMessage}
          </FormHelperText>
          {error ? (
            <Clear
              className={classes.feedback + " " + classes.labelRootError}
            />
          ) : success ? (
            <Check
              className={classes.feedback + " " + classes.labelRootSuccess}
            />
          ) : null}
        </FormControl>
      }
    />
  );
}

FilterTutorSearch.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
};
