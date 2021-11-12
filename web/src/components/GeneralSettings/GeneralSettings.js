import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import SelectInput from "components/SelectInput/SelectInput";
import SuccessModal from "components/SuccessModal/SuccessModal";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import strings from "constants/strings";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ErrorModal from "components/ErrorModal/ErrorModal";
import api from "services/api";
import { checkValidity, translatePhoneNumber } from "utils";
import styles from "./generalSettingsStyle";

const useStyles = makeStyles(styles);

const SettingsInput = (props) => {
  const classes = useStyles();

  const { label, ...rest } = props;
  return (
    <GridContainer justify="center" className={classes.rowContainer}>
      <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
        <p className={classes.label}>{label}</p>
      </GridItem>
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <InputWithLabel
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          placeholder={label}
          formControlStyle={classes.formControl}
          inputStyle={classes.input}
          {...rest}
        />
      </GridItem>
    </GridContainer>
  );
};

const SettingsSelectInput = (props) => {
  const classes = useStyles();

  return (
    <GridContainer justify="center" className={classes.rowContainer}>
      <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
        <p className={classes.label}>{props.label}</p>
      </GridItem>
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <SelectInput
          selectStyle={classes.select}
          id={props.id}
          placeholder={props.placeholder}
          data={props.data}
          value={props.value}
          onSelect={props.onSelect}
        />
      </GridItem>
    </GridContainer>
  );
};

export default function GeneralSettings(props) {
  const [values, setValues] = React.useState({
    firstName: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },

    lastName: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },

    address: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },

    grade: {
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    },

    education: {
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    },

    city: {
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    },

    area: {
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    },
  });

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const currentUser = useSelector((state) => state.auth);

  const [citiesWithAreas, setCitiesWithAreas] = React.useState(null);

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const [email, setEmail] = React.useState(null);
  const [countryCode, setCountryCode] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  useEffect(() => {
    (async () => {
      const response = (await api.getCitiesWithAreas()).data;

      setCitiesWithAreas(response);

      let updatedValues = { ...values };
      if (currentUser.firstName)
        updatedValues.firstName.value = currentUser.firstName;
      if (currentUser.lastName)
        updatedValues.lastName.value = currentUser.lastName;
      if (currentUser.address)
        updatedValues.address.value = currentUser.address;
      if (currentUser.grade !== null)
        updatedValues.grade.value = currentUser.grade + 1;
      if (currentUser.education !== null)
        updatedValues.education.value = currentUser.education + 1;
      if (currentUser.cityId) updatedValues.city.value = currentUser.cityId;
      if (currentUser.areaId) updatedValues.area.value = currentUser.areaId;

      setValues(updatedValues);
      setEmail(currentUser.email);
      setCountryCode(currentUser.countryCode);
      setPhone(currentUser.phone);
    })();
  }, []);

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const handleSubmit = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      if (key === "firstName" || key === "lastName") {
        const updatedElement = { ...updatedValues[key] };
        updatedElement.error = checkValidity(
          updatedElement.value,
          updatedElement.validation
        );
        updatedElement.valid = updatedElement.error === null;
        updatedValues = { ...updatedValues, [key]: updatedElement };
        isFormValid = isFormValid && updatedElement.valid;
      }
    });
    setValues(updatedValues);

    if (isFormValid) {
      setLoading(true);
      try {
        await api.updateStudentSettings({
          firstName: values.firstName.value,
          lastName: values.lastName.value,
          ...(values.address.value !== ""
            ? { address: values.address.value }
            : {}),
          ...(values.grade.value !== 0
            ? { grade: values.grade.value - 1 }
            : {}),
          ...(values.education.value !== 0
            ? { education: values.education.value - 1 }
            : {}),
          ...(values.city.value !== 0 ? { cityId: values.city.value } : {}),
          ...(values.area.value !== 0 ? { areaId: values.area.value } : {}),
        });
        setShowSuccessModal(true);
      } catch (err) {
        let updatedValues = { ...values };
        if (err.response?.data?.errors?.length) {
          err.response.data.errors.forEach((error) => {
            if (error.location && error.location === "body") {
              const updatedElement = { ...updatedValues[error.param] };
              updatedElement.error = error.msg;
              updatedElement.valid = false;
              updatedValues = {
                ...updatedValues,
                [error.param]: updatedElement,
              };
              setValues(updatedValues);
            }
          });
        } else {
          setShowErrorModal(true);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const cities = citiesWithAreas
    ? citiesWithAreas
        .map((cityWithArea) => ({
          name: cityWithArea.name[lang],
          value: cityWithArea.id,
          areas: cityWithArea.areas,
        }))
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
    : [];

  let areas = [];
  if (values.city.value !== 0 && cities.length) {
    let cityIndex = cities.findIndex((city) => city.value == values.city.value);
    areas = cities[cityIndex].areas
      .map((area) => ({ name: area.name[lang], value: area.id }))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  const grades = strings.grades.map((grade, index) => ({
    name: grade[lang],
    value: index + 1,
  }));

  const educations = strings.educations.map((education, index) => ({
    name: education[lang],
    value: index + 1,
  }));

  return (
    <GridContainer justify="center">
      <GridItem
        xs={12}
        sm={12}
        md={6}
        style={{ overflow: "hidden" }}
        className={classes.gridItem}
      >
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={strings.settingsUpdatedSuccessfully[lang]}
        />

        <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />

        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.emailInputLabel[lang]}</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
            <div className={classes.disabledInput}>{email}</div>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.phone[lang]}</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
            <div className={classes.disabledInput}>
              {translatePhoneNumber(`${countryCode}${phone}`, lang)}
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.name[lang]}</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={5} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              placeholder={strings.firstName[lang]}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={values.firstName.value}
              valid={values.firstName.isValid}
              errorMessage={
                values.firstName.error && values.firstName.error[lang]
              }
              inputProps={{
                onChange: handleChange("firstName"),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={5} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              placeholder={strings.lastName[lang]}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={values.lastName.value}
              valid={values.lastName.isValid}
              errorMessage={
                values.lastName.error && values.lastName.error[lang]
              }
              inputProps={{
                onChange: handleChange("lastName"),
              }}
            />
          </GridItem>
        </GridContainer>
        <SettingsInput
          label={strings.address[lang]}
          value={values.address.value}
          valid={values.address.isValid}
          errorMessage={values.address.error && values.address.error[lang]}
          inputProps={{
            onChange: handleChange("address"),
          }}
        />
        <SettingsSelectInput
          id="grade"
          label={strings.grade[lang]}
          placeholder={strings.grade[lang]}
          data={grades}
          value={values.grade.value}
          onSelect={handleChange("grade")}
        />
        <SettingsSelectInput
          id="education"
          label={strings.education[lang]}
          placeholder={strings.education[lang]}
          data={educations}
          value={values.education.value}
          onSelect={handleChange("education")}
        />
        <SettingsSelectInput
          id="city"
          label={strings.city[lang]}
          placeholder={strings.city[lang]}
          data={cities.map((city) => ({ name: city.name, value: city.value }))}
          value={values.city.value}
          onSelect={(event) => {
            let updatedCity = { ...values.city };
            updatedCity.value = event.target.value;
            let updatedArea = { ...values.area };
            updatedArea.value = 0;
            setValues({ ...values, city: updatedCity, area: updatedArea });
          }}
        />
        <SettingsSelectInput
          id="area"
          label={strings.area[lang]}
          placeholder={strings.area[lang]}
          data={areas}
          value={values.area.value}
          onSelect={handleChange("area")}
        />
        <Loading loading={loading} style={{ height: "fit-content" }}>
          <Button
            round
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            {strings.save[lang]}
          </Button>
        </Loading>
      </GridItem>
    </GridContainer>
  );
}
