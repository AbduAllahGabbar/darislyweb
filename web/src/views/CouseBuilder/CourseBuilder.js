import React, { useState, useEffect } from "react";
import Button from "components/CustomButtons/Button.js";
import strings from "constants/strings";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import CourseBuilderPreliminaryInfo from "components/CourseBuilderPreliminaryInfo/CourseBuilderPreliminaryInfo";
import { makeStyles } from "@material-ui/core";
import CourseBuilderStyle from "./CourseBuilderStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CourseCreationSteps from "components/CourseCreationSteps/CourseCreationSteps";
import api from "services/api";
import Stepper from "components/Stepper/Stepper";
import { useSelector, useDispatch } from "react-redux";
import AddCourseGroups from "components/AddCourseGroups/AddCourseGroups";
import PublishCourse from "components/PublishCourse/PublishCourse";
import AddLectures from "components/AddLectures/AddLectures";
import { useHistory, useLocation } from "react-router";
import { getCourseData } from "../../store/actions";

const useStyles = makeStyles(CourseBuilderStyle);

export default function CourseBuilder() {
  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const [activeStep, setActiveStep] = useState(0);

  const location = useLocation();

  const courseAction = location.state?.courseAction;

  let courseId = null;
  if (courseAction == "edit") courseId = location.state?.courseId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return (
          <CourseBuilderPreliminaryInfo
            handleNext={handleNext}
            handleBack={handleBack}
            courseAction={courseAction}
            courseId={courseId}
          />
        );
      case 1:
        return (
          <AddLectures
            handleNext={handleNext}
            handleBack={handleBack}
            courseAction={courseAction}
          />
        );

      // case 2:
      default:
        return (
          <AddCourseGroups
            handleNext={handleNext}
            handleBack={handleBack}
            courseAction={courseAction}
          />
        );

      // default:
      //   return <PublishCourse
      //     handleNext={handleNext}
      //     handleBack={handleBack} />;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="gray" />}
        fixed
        color="secondary"
      />
      <div className={classes.root}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Stepper activeStep={activeStep} />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              {displayStep(activeStep)}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
