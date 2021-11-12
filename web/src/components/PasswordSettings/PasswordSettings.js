import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import SuccessModal from "components/SuccessModal/SuccessModal";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import strings from "constants/strings";
import enums from "enums";
import React from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { checkValidity } from "utils";
import styles from "./passwordSettingsStyle";

const useStyles = makeStyles(styles);

const SettingsPasswordInput = (props) => {
  const { label, ...rest } = props;
  const classes = useStyles();
  return (
    <GridContainer justify="center" className={classes.rowContainer}>
      <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
        <p className={classes.label}>{label}</p>
      </GridItem>
      <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
        <PasswordInput {...rest} />
      </GridItem>
    </GridContainer>
  );
};

const initialValues = {
  oldPassword: {
    value: "",
    validation: {
      required: true,
      minLength: 8,
      maxLength: 50,
      password: true,
    },
    valid: false,
    error: null,
  },
  newPassword: {
    value: "",
    validation: {
      required: true,
      minLength: 8,
      maxLength: 50,
      password: true,
    },
    valid: false,
    error: null,
  },
  confirmNewPassword: {
    value: "",
    validation: {
      required: true,
      minLength: 8,
      maxLength: 50,
      password: true,
    },
    valid: false,
    error: null,
  },
};

export default function PasswordSettings(props) {
  const [values, setValues] = React.useState(initialValues);

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const currentUser = useSelector((state) => state.auth);

  const [loading, setLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;
    setValues({ ...values, [prop]: updatedElement });
  };

  const handleSubmit = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      updatedElement.error = checkValidity(
        updatedElement.value,
        updatedElement.validation
      );

      if (
        updatedElement.error &&
        updatedElement.error[lang] === strings.passwordInvalidError[lang]
      ) {
        updatedElement.error = strings.passwordInputHelper;
      }

      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });

    if (
      updatedValues.confirmNewPassword.value !==
        updatedValues.newPassword.value &&
      updatedValues.confirmNewPassword.valid
    ) {
      const confirmNewPassword = { ...updatedValues["confirmNewPassword"] };
      confirmNewPassword.error = strings.confirmPasswordError;
      confirmNewPassword.valid = false;
      updatedValues = { ...updatedValues, confirmNewPassword };
      isFormValid = false;
    }

    if (
      updatedValues.newPassword.value === updatedValues.oldPassword.value &&
      updatedValues.newPassword.valid
    ) {
      const newPassword = { ...updatedValues["newPassword"] };
      newPassword.error = strings.newPasswordError;
      newPassword.valid = false;
      updatedValues = { ...updatedValues, newPassword };
      isFormValid = false;
    }

    setValues(updatedValues);

    const route =
      currentUser.role === enums.UserRoles.STUDENT
        ? "students"
        : currentUser.role === enums.UserRoles.TUTOR
        ? "tutors"
        : currentUser.role === enums.UserRoles.STAFF
        ? "staff"
        : "";

    if (isFormValid && route !== "") {
      setLoading(true);
      try {
        await api.changePassword(route, {
          oldPassword: values.oldPassword.value,
          newPassword: values.newPassword.value,
        });
        setShowSuccessModal(true);
        setValues(initialValues);
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
      <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={strings.resetPasswordSuccessfully[lang]}
        />
        <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />
        <SettingsPasswordInput
          formControlStyle={classes.passwordFormControl}
          inputStyle={classes.input}
          label={strings.oldPassword[lang]}
          data={values.oldPassword}
          handleChange={handleChange("oldPassword")}
        />

        <SettingsPasswordInput
          formControlStyle={classes.passwordFormControl}
          inputStyle={classes.input}
          label={strings.newPassword[lang]}
          data={values.newPassword}
          handleChange={handleChange("newPassword")}
        />

        <SettingsPasswordInput
          formControlStyle={classes.passwordFormControl}
          inputStyle={classes.input}
          label={strings.confirmPassword[lang]}
          data={values.confirmNewPassword}
          handleChange={handleChange("confirmNewPassword")}
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
