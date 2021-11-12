import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { primaryColor } from "assets/jss/material-kit-pro-react";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import countryPhoneCodes from "constants/countryPhoneCodes";
import React from "react";
import { useSelector } from "react-redux";
// core components
import styles from "./phoneInputStyle";

const useStyles = makeStyles(styles);

export default function PhoneInput(props) {
  const {
    country,
    handleCountryCodeSelect,
    handleChange,
    selectStyle,
    ...rest
  } = props;

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const position = lang === "en" ? "start" : "end";

  const countries = countryPhoneCodes.sort((a, b) =>
    a[lang].toLowerCase().localeCompare(b[lang].toLowerCase())
  );

  const countryPhoneCodesMenuItems = countries.map((country, index) => (
    <MenuItem key={`countryCode-${index}`} value={index}>
      <span style={{ width: "30%" }}>
        (
        {lang === "en"
          ? country.code
          : country.code.substr(1, country.code.length) + "+"}
        )
      </span>
      <span>{country[lang]}</span>
    </MenuItem>
  ));

  const phoneCodeAdornment = (
    <InputAdornment position={position} className={classes.inputAdornment}>
      <Select
        disableUnderline
        className={classes.codeSelect}
        style={{
          borderRight: `solid 2px ${primaryColor[0]}`,
          borderLeft: 0,
          ...selectStyle,
        }}
        value={country}
        renderValue={() =>
          lang === "en"
            ? countries[country].code
            : countries[country].code.substr(
                1,
                countries[country].code.length
              ) + "+"
        }
        onChange={handleCountryCodeSelect}
        inputProps={{
          name: "simpleSelect",
          id: "simple-select",
        }}
      >
        {countryPhoneCodesMenuItems}
      </Select>
    </InputAdornment>
  );

  return (
    <InputWithLabel
      {...rest}
      type="number"
      inputProps={{
        [`${position}Adornment`]: phoneCodeAdornment,
        onChange: handleChange("phone"),
      }}
    />
  );
}
