/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { checkValidity } from "utils";
import bgImage from "../../assets/images/banner-bg.png";
import forgotPasswordStyle from "./forgotPasswordStyle.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import PasswordInput from "components/TextInputs/PasswordInput/PasswordInput";
import strings from "constants/strings";
import DarislyIcon from "../../assets/images/DarislyIcon.png";
import ErrorModal from "components/ErrorModal/ErrorModal";
import api from "services/api";
import enums from "enums";

const useStyles = makeStyles(forgotPasswordStyle);

export default function ForgotPassword({ ...rest }) {
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
    },
    role: null,
  });

  const [loading, setLoading] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const history = useHistory();

  const location = useLocation();

  const lang = useSelector((state) => state.lang);
 
  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const path = location.pathname.split("/")[1];
      let role =
        path === "student"
          ? enums.UserRoles.STUDENT
          : path === "tutor"
          ? enums.UserRoles.TUTOR
          : -1;

      setValues({ ...values, role });
    })();
  }, []);

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const handleResetPassword = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    const updatedElement = { ...updatedValues.email };
    updatedElement.error = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.valid = updatedElement.error === null;
    updatedValues = { ...updatedValues, email: updatedElement };
    isFormValid = isFormValid && updatedElement.valid;
    setValues(updatedValues);

    if (isFormValid) {
      setLoading(true);
      try {
        await api.forgotPassword(
          {
            email: values.email.value,
            role: values.role,
          },
          lang
        );

        history.push({
          pathname: "/forgotsucceed",
          state: { email: values.email.value },
        });
      } catch (err) {
        setLoading(false);
        let updatedValues = { ...values };
        if (err.response?.data?.errors?.length) {
          err.response.data.errors.forEach((error) => {
            if (
              error.location &&
              error.location === "body" &&
              error.param === "email"
            ) {
              const updatedEmail = { ...updatedValues[error.param] };
              updatedEmail.error = error.msg;
              updatedEmail.valid = false;
              updatedValues = {
                ...updatedValues,
                [error.param]: updatedEmail,
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
                              {strings.smallTitleResetPassword[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={12}
                            sm={12}
                            md={8}
                            // className={classes.rowContainer}
                          >
                            <div className={classes.largeTitle}>
                              {strings.largeTitleResetPassword[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          // className={classes.verticalPadding}
                        >
                          <GridItem xs={10} sm={10} md={10}>
                            <InputWithLabel
                              // labelText={strings.emailInputLabel[lang]}
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
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
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
                                onClick={handleResetPassword}
                                round
                              >
                                {strings.resetPasswordButton[lang]}
                              </Button>
                            )}
                          </GridItem>
                        </GridContainer>
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
