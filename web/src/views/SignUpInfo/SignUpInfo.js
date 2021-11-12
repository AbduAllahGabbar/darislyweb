/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import bgImage from "assets/images/banner-bg.png";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import PhoneInput from "components/TextInputs/PhoneInput/PhoneInput";
import countryPhoneCodes from "constants/countryPhoneCodes";
import strings from "constants/strings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkValidity } from "utils";
import { signUpStudent } from "../../store/actions";
import signUpInfoStyle from "./signUpInfoStyle";
import ErrorModal from "components/ErrorModal/ErrorModal";

const useStyles = makeStyles(signUpInfoStyle);

export default function SignUpInfo(props) {
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    email: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
        email: true,
      },
      valid: false,
      error: null,
      disabled: false,
    },

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

    phone: {
      value: "",
      validation: {
        required: true,
        phone: true,
      },
      valid: false,
      error: null,
    },

    password: {
      value: "",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
        password: true,
      },
      valid: false,
      error: null,
      show: false,
    },
  });

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const updatedEmail = { ...values.email };
      const updatedFirstName = { ...values.firstName };
      const updatedLastName = { ...values.lastName };

      if (currentUser.email) {
        updatedEmail.value = currentUser.email;
        updatedEmail.disabled = true;
      }
      if (currentUser.firstName) updatedFirstName.value = currentUser.firstName;
      if (currentUser.lastName) updatedLastName.value = currentUser.lastName;

      setValues({
        ...values,
        email: updatedEmail,
        firstName: updatedFirstName,
        lastName: updatedLastName,
      });
    }
  }, [currentUser]);

  const history = useHistory();

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const handleSubmit = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      if (key !== "password" || (key === "password" && !currentUser)) {
        const updatedElement = { ...updatedValues[key] };
        let val = updatedElement.value;
        if (key === "phone") {
          val = countries[simpleSelect].code + val;
        }

        updatedElement.error = checkValidity(val.trim(), updatedElement.validation);
        updatedElement.valid = updatedElement.error === null;
        updatedValues = { ...updatedValues, [key]: updatedElement };
        isFormValid = isFormValid && updatedElement.valid;
      }
    });
    setValues(updatedValues);

    if (isFormValid) {
      let signUpInfo = {
        countryCode: countries[simpleSelect].code,
        country: countries[simpleSelect].index,
      };
      Object.keys(updatedValues).forEach((key) => {
        if (key !== "password" || (key === "password" && !currentUser)) {
          signUpInfo[key] = updatedValues[key].value.trim();
        }
      });

      setLoading(true);

      try {
        await dispatch(signUpStudent(signUpInfo));
        history.push("emailconfirmation");
        // history.push({
        //   pathname: "verifyphone",
        //   data: {
        //     fullName: `${values.firstName.value} ${values.lastName.value}`,
        //   },
        // });
      } catch (err) {
        setLoading(false);
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
      }
    }
  };

  const lang = useSelector((state) => state.lang);

  const [simpleSelect, setSimpleSelect] = React.useState(
    lang === "en" ? 62 : 214
  );

  const [loading, setLoading] = React.useState(false);
  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const classes = useStyles();

  const countries = countryPhoneCodes.sort((a, b) =>
    a[lang].toLowerCase().localeCompare(b[lang].toLowerCase())
  );

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
              <Card className={classes.cardSignup}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInfo}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <ErrorModal
                        open={showErrorModal}
                        onClose={() => setShowErrorModal(false)}
                      />
                      <div className={classes.paddingText}>
                        <InfoArea
                          className={
                            classes.infoArea +
                            " " +
                            classes.titleFont +
                            " " +
                            classes.lineHeight
                          }
                          description={strings.darisly[lang]}
                        />
                        <InfoArea
                          className={classes.infoArea + " " + classes.titleFont}
                          description={strings.blueHeader1[lang]}
                        />
                        <InfoArea
                          className={classes.infoArea}
                          description={strings.blueHeader2[lang]}
                        />
                        <div className={classes.infoArea}>
                          {strings.blueHeader3[lang]} &nbsp;
                          <a
                            href="/privacypolicy"
                            className={classes.infoAreaLink}
                          >
                            {strings.privacyPolicy[lang]}
                          </a>
                          &nbsp;{strings.blueHeader4[lang]} &nbsp;
                          <a
                            href="/termsofuse"
                            className={classes.infoAreaLink}
                          >
                            {strings.termsOfUse[lang]}
                          </a>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <GridContainer
                        justify="center"
                        className={classes.verticalPadding}
                      >
                        <GridItem xs={10} sm={10} md={10}>
                          <form className={classes.form}>
                            <InputWithLabel
                              labelText={strings.emailInputLabel[lang]}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              value={values.email.value}
                              valid={values.email.isValid}
                              errorMessage={
                                values.email.error && values.email.error[lang]
                              }
                              inputProps={{
                                onChange: handleChange("email"),
                                ...(values.email.disabled
                                  ? {
                                      onKeyDown: (event) => {
                                        event.preventDefault();
                                      },
                                    }
                                  : {}),
                              }}
                            />

                            <GridContainer justify="space-between">
                              <GridItem xs={12} sm={12} md={6}>
                                <InputWithLabel
                                  labelText={strings.firstNameInputLabel[lang]}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses,
                                  }}
                                  value={values.firstName.value}
                                  valid={values.firstName.isValid}
                                  errorMessage={
                                    values.firstName.error &&
                                    values.firstName.error[lang]
                                  }
                                  inputProps={{
                                    onChange: handleChange("firstName"),
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <InputWithLabel
                                  labelText={strings.lastNameInputLabel[lang]}
                                  formControlProps={{
                                    fullWidth: true,
                                    className: classes.customFormControlClasses,
                                  }}
                                  value={values.lastName.value}
                                  valid={values.lastName.isValid}
                                  errorMessage={
                                    values.lastName.error &&
                                    values.lastName.error[lang]
                                  }
                                  inputProps={{
                                    onChange: handleChange("lastName"),
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <PhoneInput
                              labelText={strings.phoneNumberInputLabel[lang]}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              value={values.phone.value}
                              valid={values.phone.isValid}
                              errorMessage={
                                values.phone.error && values.phone.error[lang]
                              }
                              country={simpleSelect}
                              handleCountryCodeSelect={handleSimple}
                              handleChange={handleChange}
                            />

                            {currentUser ? null : (
                              <PasswordInput
                                labelText={strings.passwordInputLabel[lang]}
                                descriptionText={
                                  strings.passwordInputHelper[lang]
                                }
                                data={values.password}
                                handleChange={handleChange("password")}
                              />
                            )}

                            <div className={classes.textCenter}>
                              {loading ? (
                                <CircularProgress
                                  className={classes.circularProgress}
                                />
                              ) : (
                                <Button
                                  round
                                  color="primary"
                                  style={{ width: "100%", marginTop: 17 }}
                                  onClick={handleSubmit}
                                >
                                  {strings.nextButton[lang]}
                                </Button>
                              )}
                            </div>
                          </form>
                        </GridItem>
                      </GridContainer>

                      {currentUser && (
                        <GridContainer justify="center">
                          <GridItem xs={10} sm={10} md={10}>
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/cancelsignup`}
                              className={classes.cancelSignUpContainer}
                            >
                              {strings.cancelSignup[lang]}
                            </a>
                          </GridItem>
                        </GridContainer>
                      )}
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
