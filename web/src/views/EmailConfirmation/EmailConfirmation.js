/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import strings from "constants/strings";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import bgImage from "../../assets/images/banner-bg.png";
import DarislyIcon from "../../assets/images/DarislyIcon.png";
import DarislyIconArabic from "../../assets/images/DarislyIconArabic.png";
import ErrorModal from "components/ErrorModal/ErrorModal";
import api from "services/api";
import { msToTime, translateNumber } from "utils";

import emailConfirmationStyle from "./emailConfirmationStyle.js";

const useStyles = makeStyles(emailConfirmationStyle);

let resendTimerInterval;

const timerDuration = 30;
const timerStep = 1;

export default function EmailConfirmation({ ...rest }) {
  const [values, setValues] = React.useState({
    email: "",
  });

  const lang = useSelector((state) => state.lang);

  const currentUser = useSelector((state) => state.auth);

  const classes = useStyles();

  const history = useHistory();

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const [resendRemainingTime, setResendRemainingTime] = React.useState(
    timerDuration * 1000
  );

  useEffect(() => {
    if (currentUser) {
      const updatedEmail = currentUser.email;

      setValues({
        ...values,
        email: updatedEmail,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        const lastEmailConfirmation = (await api.checkResendEmailConfirmation())
          .data.lastEmailConfirmation;

        const t1 = new Date(new Date().toUTCString());
        const t2 = new Date(new Date(lastEmailConfirmation).toUTCString());
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

  const resendConfirmationEmailHandler = async () => {
    setResendRemainingTime(timerDuration * 1000);
    startResendTimer();

    try {
      await api.resendEmailConfirmation();
    } catch (err) {
      setShowErrorModal(false);
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
              <Card className={classes.cardEmailConfirmation}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
                      <div className={classes.textCenter}>
                        <ErrorModal
                          open={showErrorModal}
                          onClose={() => setShowErrorModal(false)}
                        />

                        <GridContainer justify="center">
                          <GridItem
                            xs={12}
                            sm={12}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <img
                              // src={
                              //   lang === "en" ? DarislyIcon : DarislyIconArabic
                              // }
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
                            <div className={classes.title}>
                              {strings.firstTitleEmailConfirmation[lang]}
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
                            <div className={classes.emailTitle}>
                              {values.email}
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
                            <div className={classes.title}>
                              {strings.secondTitleEmailConfirmation[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>

                        <GridContainer justify="center">
                          <GridItem xs={10} sm={10} md={10}>
                            {resendRemainingTime > 0 ? (
                              <div className={classes.resendEmailContainer}>
                                {`${
                                  strings.retryResendEmail[lang]
                                } ${translateNumber(
                                  msToTime(resendRemainingTime),
                                  lang
                                )} ${strings.seconds[lang]}`}
                              </div>
                            ) : (
                              <div
                                className={
                                  classes.resendEmailContainer +
                                  " " +
                                  classes.pointer
                                }
                                onClick={resendConfirmationEmailHandler}
                              >
                                {strings.resendEmail[lang]}
                              </div>
                            )}
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
