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
import api from "services/api";
import { checkValidity, translatePhoneNumber } from "utils";
import ErrorModal from "components/ErrorModal/ErrorModal";
import styles from "./generalSettingsStyle";

const useStyles = makeStyles(styles);

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
  });

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const currentUser = useSelector((state) => state.auth);

  const [email, setEmail] = React.useState(null);
  const [countryCode, setCountryCode] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  useEffect(() => {
    (async () => {
      let updatedValues = { ...values };
      if (currentUser.firstName)
        updatedValues.firstName.value = currentUser.firstName;
      if (currentUser.lastName)
        updatedValues.lastName.value = currentUser.lastName;

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
        await api.updateTutorSettings({
          firstName: values.firstName.value,
          lastName: values.lastName.value,
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
