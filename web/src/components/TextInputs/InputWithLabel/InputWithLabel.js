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
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// core components
import styles from "./inputWithLabelStyle";

const useStyles = makeStyles(styles);

export default function InputWithLabel(props) {
  const {
    formControlProps,
    labelText,
    descriptionText,
    id,
    value,
    labelProps,
    inputProps,
    placeholder,
    error,
    white,
    inputRootCustomClasses,
    success,
    valid,
    errorMessage,
    formControlStyle,
    inputStyle,
    type,
    webkitBoxShadow,
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
    <FormControl
      {...formControlProps}
      className={formControlClasses + " " + formControlStyle}
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
          input: inputClasses + " " + inputStyle + " " + webkitBoxShadow,
          root: marginTop,
          disabled: classes.disabled,
        }}
        type={type}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
        value={value}
        placeholder={placeholder}
        disableUnderline={true}
      />
      <FormHelperText
        id="component-error-text"
        className={classes.labelRootError}
      >
        {errorMessage}
      </FormHelperText>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

InputWithLabel.propTypes = {
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
