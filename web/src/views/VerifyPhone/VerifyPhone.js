/*eslint-disable*/
// @material-ui/core components
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import strings from "constants/strings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import { verifyPhone } from "store/actions";
import { checkValidity, msToTime, translateNumber } from "utils";
import bgImage from "../../assets/images/banner-bg.png";
import verifyPhonePageStyle from "./verifyPhoneStyle.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(verifyPhonePageStyle);

let resendTimerInterval;

const timerDuration = 30;
const timerStep = 1;

export default function VerifyPhone(props) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const [values, setValues] = React.useState({
    code: {
      value: "",
      validation: {
        required: true,
        number: true,
        minLength: 4,
        maxLength: 4,
      },
      valid: false,
      error: null,
    },
    name: history.location.data?.fullName,
  });
  const lang = useSelector((state) => state.lang);

  const currentUser = useSelector((state) => state.auth);

  const [resendRemainingTime, setResendRemainingTime] = React.useState(
    timerDuration * 1000
  );

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const updatedName = currentUser.firstName;

        setValues({
          ...values,
          name: updatedName,
        });
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      try {
        const lastPhoneVerification = (await api.checkResendPhoneVerification())
          .data.lastPhoneVerification;

        const t1 = new Date(new Date().toUTCString());
        const t2 = new Date(new Date(lastPhoneVerification).toUTCString());
        let timeRemaining = t1.getTime() - t2.getTime();

        timeRemaining =
          timeRemaining > timerDuration * 1000
            ? 0
            : timerDuration * 1000 - timeRemaining;

        setResendRemainingTime(timeRemaining);
      } catch (err) {
        setShowErrorModal(true);
      }
    })();
  }, []);

  useEffect(() => {
    startResendTimer();

    return () => {
      if (resendTimerInterval) {
        clearInterval(resendTimerInterval);
      }
    };
  }, [resendTimerInterval]);

  const [loading, setLoading] = React.useState(false);

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const handleSubmit = async () => {
    const codeInput = { ...values.code };
    let val = codeInput.value;
    codeInput.error = checkValidity(val, codeInput.validation);
    codeInput.valid = codeInput.error === null;
    setValues({ ...values, code: codeInput });

    let isFormValid = codeInput.valid;

    if (isFormValid) {
      setLoading(true);
      try {
        // await verifyPhone({ code: values.code.value });

        await dispatch(verifyPhone({ code: values.code.value }));
        history.push("emailconfirmation");
      } catch (err) {
        setLoading(false);
        let updatedValues = { ...values };
        if (err.response?.data?.errors?.length) {
          err.response.data.errors.forEach((error) => {
            if (
              error.location &&
              error.location === "body" &&
              error.param === "code"
            ) {
              const updatedCode = { ...updatedValues[error.param] };
              updatedCode.error = error.msg;
              updatedCode.valid = false;
              updatedValues = {
                ...updatedValues,
                [error.param]: updatedCode,
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

  const startResendTimer = () => {
    if (resendTimerInterval) {
      clearInterval(resendTimerInterval);
    }

    resendTimerInterval = setInterval(() => {
      if (resendRemainingTime <= 0) {
        clearInterval(resendTimerInterval);
      } else {
        setResendRemainingTime(resendRemainingTime - timerStep * 1000);
      }
    }, timerStep * 1000);
  };

  const resendVerificationSMSHandler = async () => {
    setResendRemainingTime(timerDuration * 1000);
    startResendTimer();

    try {
      await api.resendPhoneVerification();
    } catch (err) {
      setShowErrorModal(true);
    }
  };

  const classes = useStyles();
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
              <Card className={classes.cardVerifyPhone}>
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
                          <Link
                            to="/privacypolicy"
                            className={classes.infoAreaLink}
                          >
                            {strings.privacyPolicy[lang]}
                          </Link>
                          &nbsp;{strings.blueHeader4[lang]} &nbsp;
                          <Link
                            to="/termsofuse"
                            className={classes.infoAreaLink}
                          >
                            {strings.termsOfUse[lang]}
                          </Link>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <div className={classes.textLeft}>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={10}
                            className={classes.rowContainer}
                          >
                            <div className={classes.primaryTitle}>
                              {strings.clientLabel[lang].replace(
                                "%NAME%",
                                values.name || ""
                              )}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={10}
                            className={classes.rowContainer}
                          >
                            <div className={classes.secondaryTitle}>
                              {strings.codeLabel[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          className={classes.verticalPadding}
                        >
                          <GridItem xs={10} sm={10} md={10}>
                            <InputWithLabel
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses,
                              }}
                              valid={values.code.isValid}
                              errorMessage={
                                values.code.error && values.code.error[lang]
                              }
                              inputProps={{
                                onChange: handleChange("code"),
                              }}
                            />
                          </GridItem>
                        </GridContainer>

                        <GridContainer justify="center">
                          <GridItem xs={10} sm={10} md={10}>
                            {resendRemainingTime > 0 ? (
                              <div className={classes.resendSmsContainer}>
                                {`${
                                  strings.retryResendSms[lang]
                                } ${translateNumber(
                                  msToTime(resendRemainingTime),
                                  lang
                                )} ${strings.seconds[lang]}`}
                              </div>
                            ) : (
                              <div
                                className={
                                  classes.resendSmsContainer +
                                  " " +
                                  classes.pointer
                                }
                                onClick={resendVerificationSMSHandler}
                              >
                                {strings.resendSms[lang]}
                              </div>
                            )}
                          </GridItem>
                        </GridContainer>

                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={10}
                            className={
                              classes.rowContainer + " " + classes.textCenter
                            }
                          >
                            {loading ? (
                              <CircularProgress
                                className={classes.circularProgress}
                              />
                            ) : (
                              <Button
                                color="primary"
                                //target="_blank"
                                className={classes.buttonFilled}
                                round
                                onClick={handleSubmit}
                              >
                                {strings.nextButton[lang]}
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
