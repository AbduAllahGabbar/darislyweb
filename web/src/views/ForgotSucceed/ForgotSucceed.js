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
import { useHistory, useLocation } from "react-router";
import bgImage from "../../assets/images/banner-bg.png";
import DarislyIcon from "../../assets/images/DarislyIcon.png";
import forgotSucceedPageStyle from "./forgotSucceedStyle.js";

const useStyles = makeStyles(forgotSucceedPageStyle);

export default function ForgotSucceed({ ...rest }) {
  const [values, setValues] = React.useState({
    email: "",
  });

  const lang = useSelector((state) => state.lang);
  // React.useEffect(() => {
  // });

  const location = useLocation();

  const history = useHistory();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const email = location.state?.email;
      if (!email) history.push("/");
      setValues({ ...values, email });
    })();
  }, []);
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
              <Card className={classes.cardForgotSucceed}>
                <CardBody className={classes.noPadding}>
                  <GridContainer justify="center">
                    <GridItem
                      className={classes.noPadding + " " + classes.cardInputs}
                      xs={12}
                      sm={6}
                      md={6}
                    >
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
                            <div className={classes.title}>
                              {strings.firstTitleForgotSucceed[lang]}
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
                              {strings.secondTitleForgotSucceed[lang]}
                            </div>
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
