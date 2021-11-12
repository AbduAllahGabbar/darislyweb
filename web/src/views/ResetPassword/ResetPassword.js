/*eslint-disable*/
// @material-ui/core components
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import strings from "constants/strings";
import enums from "enums";
// core components
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import api from "services/api";
import { setLanguage } from "store/actions";
import { checkValidity } from "utils";
import bgImage from "../../assets/images/banner-bg.png";
import DarislyIcon from "../../assets/images/DarislyIcon.png";
import resetPasswordPageStyle from "./resetPasswordStyle.js";
import ErrorModal from "components/ErrorModal/ErrorModal";

const useStyles = makeStyles(resetPasswordPageStyle);

export default function ResetPassword({ ...rest }) {
  const [values, setValues] = React.useState({
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
  });

  const [role, setRole] = React.useState(null);

  const [token, setToken] = React.useState(null);

  const [error, setError] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const path = location.pathname.split("/")[1];
      let role =
        path === "student"
          ? enums.UserRoles.STUDENT
          : path === "tutor"
          ? enums.UserRoles.TUTOR
          : -1;

      const token = new URLSearchParams(location.search).get("token");
      const language = new URLSearchParams(location.search).get("lang") || "en";
      if (!token) history.push("/");
      try {
        await api.checkResetPassword({
          token,
          role,
        });
        setRole(role);
        setToken(token);
        dispatch(setLanguage(language));
      } catch (err) {
        if (err.response?.data?.errors?.length) {
          setError(err.response.data.errors[0].msg);
        } else {
          setShowErrorModal(true);
        }
      }
    })();
  }, []);

  const lang = useSelector((state) => state.lang);

  const classes = useStyles();

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

    setValues(updatedValues);

    if (isFormValid) {
      setLoading(true);
      try {
        await api.resetPassword({
          password: values.newPassword.value,
          token,
          role,
        });

        history.push({ pathname: "/resetpasswordsucceed", state: { token } });
      } catch (err) {
        setLoading(false);
        let updatedValues = { ...values };
        if (err.response?.data?.errors?.length) {
          err.response.data.errors.forEach((error) => {
            if (
              error.location &&
              error.location === "body" &&
              error.param === "password"
            ) {
              const updatedNewPassword = { ...updatedValues[error.param] };
              updatedNewPassword.error = error.msg;
              updatedNewPassword.valid = false;
              updatedValues = {
                ...updatedValues,
                newPassword: updatedNewPassword,
              };
              setValues(updatedValues);
            }
          });
        } else {
          setShowErrorModal(true);
        }
      }
    }
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "white",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes.cardResetPassword}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <ErrorModal
                        open={showErrorModal}
                        onClose={() => setShowErrorModal(false)}
                      />

                      <div className={classes.textCenter}>
                        <GridContainer justify="center">
                          <GridItem
                            xs={12}
                            sm={12}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <img
                              //src={lang === "en" ? AppLogoEnglish : AppLogoArabic}
                              src={DarislyIcon}
                              alt="Darisly App Logo"
                              className={classes.appLogo}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={12}
                            sm={12}
                            md={8}
                            // className={classes.rowContainer}
                          >
                            <div className={classes.smallTitle}>
                              {!error
                                ? strings.enterYourNewPasswordTitle[lang]
                                : error[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>
                        {!error ? (
                          <div>
                            <GridContainer justify="center">
                              <GridItem xs={10} sm={10} md={10}>
                                <PasswordInput
                                  labelText={strings.newPassword[lang]}
                                  descriptionText={
                                    strings.passwordInputHelper[lang]
                                  }
                                  data={values.newPassword}
                                  handleChange={handleChange("newPassword")}
                                />

                                <PasswordInput
                                  formControlStyle={classes.confirmPassword}
                                  labelText={strings.confirmPassword[lang]}
                                  data={values.confirmNewPassword}
                                  handleChange={handleChange(
                                    "confirmNewPassword"
                                  )}
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                              <GridItem
                                xs={10}
                                sm={10}
                                md={10}
                                className={classes.rowContainer}
                              >
                                {loading ? (
                                  <CircularProgress
                                    className={classes.circularProgress}
                                  />
                                ) : (
                                  <Button
                                    color="primary"
                                    target="_blank"
                                    className={classes.buttonFilled}
                                    onClick={handleSubmit}
                                    round
                                  >
                                    {strings.resetPasswordButton[lang]}
                                  </Button>
                                )}
                              </GridItem>
                            </GridContainer>
                          </div>
                        ) : null}
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
