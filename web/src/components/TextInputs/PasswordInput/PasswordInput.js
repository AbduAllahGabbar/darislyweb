import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import React from "react";
import { useSelector } from "react-redux";

export default function PasswordInput(props) {
  const [showPassowrd, setShowPassword] = React.useState(false);

  const { data, handleChange, ...rest } = props;

  const lang = useSelector((state) => state.lang);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassowrd);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputWithLabel
      {...rest}
      value={data.value}
      valid={data.isValid}
      errorMessage={data.error && data.error[lang]}
      inputProps={{
        type: showPassowrd ? "text" : "password",
        onChange: handleChange,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassowrd ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
