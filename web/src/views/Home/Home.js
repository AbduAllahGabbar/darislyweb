import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import React, {useEffect} from "react";
import { useHistory } from "react-router";
import bgImage from "../../assets/images/banner-bg.png";
import videoImage from "../../assets/images/video-image.png";
import partnerImage from "../../assets/images/partner-image.png";
import homePageStyle from "./homeStyle.js";
import Button from "components/CustomButtons/Button.js";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import strings from "constants/strings";
import { useSelector } from "react-redux";
import { Icon, InlineIcon } from '@iconify/react';
import userGraduate from '@iconify/icons-fa-solid/user-graduate';
import { translateNumber } from "utils";

const useStyles = makeStyles(homePageStyle);

export default function Home({ ...rest }) {

  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const history = useHistory();

  const startLearning = () => {
    history.push("/signup");
  };

  const handleStudentApply = () => {
    history.push("/signup");
  };

  const viewCourses = () => {
    history.push("/instructors");
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="gray" />}
        fixed
        color="secondary"
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "white",
        }}
      >
        <GridContainer className={classes.termsHeader}>
          <GridItem
            xs={10}
            sm={8}
            md={8}
            className={classes.mlAuto + " " + classes.mrAuto}
          >
            <h2 className={classes.title}>{strings.homeHeader[lang]}</h2>
            <h5 className={classes.description}>
              {strings.headerParagraph[lang]}
            </h5>
            <GridContainer justify="center" className={classes.marginButtons}>
              <GridItem
                xs={12}
                sm={12}
                md={3}
              >
                <Button
                  onClick={viewCourses}
                  color="primary"
                  round
                  className={classes.viewCourses}
                >
                  <AddCircleIcon
                    className={classes.addCircleIcon}
                  />
                  {strings.viewCourses[lang]}
                </Button>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={3}
              >
                <Button
                  onClick={startLearning}
                  color="white"
                  round
                  className={classes.startLearning}
                >
                  <Icon icon={userGraduate} className={classes.startLearningIcon} />
                  {strings.startLearning[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

      </div>
      <div className={classes.container}>
        {/* <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={8}
            md={8}
            className={classes.centerImage}>
            <div
              className={classes.video}
              style={{
                backgroundImage: `url(${videoImage})`,
              }}
            >
              <i className={"fas fa-play-circle " + classes.playIcon} />
            </div>
          </GridItem>
        </GridContainer> */}
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.centerText}>
            <h3 className={classes.courseStepsTitle}>{strings.courseSteps[lang]}</h3>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.centerText + " " + classes.marginTopSteps + " " + classes.stepsCenter}>
            <div className={classes.iconBorder}>
              <h2 className={classes.headerMargin}>{translateNumber('1', lang)}</h2>
            </div>
            <h5 className={classes.description}>
              {strings.step1[lang]}
            </h5>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.centerText + " " + classes.stepsCenter}>
            <div className={classes.iconBorder}>
              <h2 className={classes.headerMargin}>{translateNumber('2', lang)}</h2>
            </div>
            <h5 className={classes.description}>
              {strings.step2[lang]}
            </h5>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.centerText + " " + classes.marginTopSteps + " " + classes.stepsCenter}>
            <div className={classes.iconBorder}>
              <h2 className={classes.headerMargin}>{translateNumber('3', lang)}</h2>
            </div>
            <h5 className={classes.description}>
              {strings.step3[lang]}
            </h5>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.centerText + " " + classes.stepsCenter}>
            <div className={classes.iconBorder}>
              <h2 className={classes.headerMargin}>{translateNumber('4', lang)}</h2>
            </div>
            <h5 className={classes.description}>
              {strings.step4[lang]}
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.marginTopSteps}>
          <GridItem
            xs={12}
            sm={6}
            md={6}>
            <GridContainer justify="center">
              <GridItem xs={10}
                sm={10}
                md={3}
                className={classes.centerPartner}>

                <img src={partnerImage} className={classes.imageSize} />
              </GridItem>
              <GridItem xs={10}
                sm={10}
                md={6}
                className={classes.centerStudentParagraph}>
                <h4 className={classes.becomeStudentHeader}>{strings.becomeStudent[lang]}</h4>
                <p className={classes.becomeStudentParagraph}>{strings.becomeStudentParagraph[lang]}</p>
                <Button
                  onClick={handleStudentApply}
                  color="primary"
                  round
                  className={classes.applyButton}
                >
                  <AddCircleIcon
                    className={classes.addIcon}
                  />
                  {strings.applyNow[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}