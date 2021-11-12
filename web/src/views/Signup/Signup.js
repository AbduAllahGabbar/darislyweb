import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import React, {useEffect} from "react";
import { useHistory } from "react-router";
import bgImage from "../../assets/images/banner-bg.png";
import signupPageStyle from "./signupStyle.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles(signupPageStyle);

export default function Signup({ ...rest }) {
  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const history = useHistory();

  const handleRegister = () => {
    history.push("signupinfo");
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
                      <div className={classes.textCenter}>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <div className={classes.title}>
                              {strings.joinDarisly[lang]}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <Button
                              color="primary"
                              target="_blank"
                              className={classes.buttonFilled}
                              onClick={handleRegister}
                              round
                            >
                              <i
                                className={"fas fa-envelope " + classes.socials}
                              />
                              {strings.register[lang]}
                            </Button>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/google`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={"fab fa-google " + classes.socials}
                                />
                                {strings.signUpGoogle[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer>
                        {/* <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/facebook`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={
                                    "fab fa-facebook " + classes.socials
                                  }
                                />
                                {strings.signUpFacebook[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer> */}
                        {/* <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <a
                              href={`${process.env.REACT_APP_API_HOST}/auth/twitter`}
                            >
                              <Button
                                color="white"
                                target="_blank"
                                className={classes.buttonOutlined}
                                round
                              >
                                <i
                                  className={
                                    "fab fa-twitter " + classes.socials
                                  }
                                />
                                {strings.signUpTwitter[lang]}
                              </Button>
                            </a>
                          </GridItem>
                        </GridContainer> */}
                        <GridContainer justify="center">
                          <GridItem
                            xs={10}
                            sm={10}
                            md={8}
                            className={classes.rowContainer}
                          >
                            <div className={classes.signin}>
                              {strings.alreadyAccount[lang]}&nbsp;
                              <Link
                                className={classes.infoAreaLink}
                                to={"/signin"}
                              >
                                {strings.signin[lang]}
                              </Link>
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
