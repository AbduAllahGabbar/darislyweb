import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import NavPills from "components/NavPills/NavPills.js";
import strings from "constants/strings.js";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "services/api";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import bgImage from "../../assets/images/course-bg.png";
import courseSingleStyle from "./courseSingleStyle.js";
import CourseCard from "./Sections/CourseCard/CourseCard";
import CourseInstructors from "./Sections/CourseInstructors/CourseInstructors";
import Curriculum from "./Sections/Curriculum/Curriculum";
import EnrollModal from "./Sections/EnrollModal/EnrollModal";
import moment from "moment";

const useStyles = makeStyles(courseSingleStyle);

export default function CourseSingle() {
  const classes = useStyles();
  let location = useLocation();
  const lang = useSelector((state) => state.lang);

  const [state, setState] = useState({
    errorModal: false,
    course: null,
    loadingCourse: true,
  });
  const [modal, setModal] = useState({
    isOpen: false,
    active: 0,
  });

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  useEffect(() => {

    window.scrollTo(0, 0);

    (async () => {
      try {
        const courseId = new URLSearchParams(location.search).get("id");
        const course = (await api.getCourse(courseId)).data;
        const startDate = moment(course.startDate);
        const endDate = moment(course.endDate);
        var duration = moment.duration(endDate.diff(startDate));
        var weeks = Math.floor(duration.asHours() / 168) + 1;
        course.duration = weeks;
        if (course) {
          setState({ ...state, course, loadingCourse: false });
        } else {
          stateHandler("errorModal", true);
        }
      } catch (err) {
        console.log(err);
        stateHandler("errorModal", true);
      }
    })();
  }, []);

  const enrollHandler = () => {
    setModal({ ...modal, isOpen: true });
  };
  const closeEnrollModal = () => {
    setModal({ ...modal, isOpen: false });
  };


  return (
    <div>
      <div
        className={classes.root}
        style={{
          backgroundImage: "url(" + bgImage + ")",
        }}
      >
        <div className={classes.container}>
          <ErrorModal
            open={state.errorModal}
            onClose={() => stateHandler("errorModal", false)}
          />
          <Loading loading={state.loadingCourse}>
            <EnrollModal
              active={modal.active}
              isOpen={modal.isOpen}
              course={state.course}
              handleClose={closeEnrollModal}
            />

            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={12}
                className={classes.gridItem + " " + classes.titleContainer}
              >
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridItem + " " + classes.center}
                  >
                    <h2 className={classes.coursetitle}>
                      {state.course?.subject.name[lang]} &nbsp;
                    </h2>
                    <h3
                      className={classes.coursetitle}
                      style={{ height: "72%" }}
                    >
                      <span>{strings.by[lang]}</span>&nbsp;
                      <span>{state.course?.tutor.firstName}</span>
                      &nbsp;
                      <span>{state.course?.tutor.lastName}</span>
                    </h3>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
                <CourseCard course={state.course} onEnroll={enrollHandler} />
              </GridItem>
              <GridItem xs={12} sm={12} md={7} className={classes.gridItem}>
                <GridContainer justify="center">
                  <GridItem
                    xs={11}
                    sm={12}
                    md={12}
                    className={classes.gridItem + " " + classes.about}
                    style={{ marginTop: 40 }}
                  >
                    {state.course?.description}
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.gridItem}
                    style={{ marginTop: 30 }}
                  >
                    <NavPills
                      centerButtons={false}
                      alignCenter
                      color="secondary"
                      tabs={[
                        {
                          tabButton: strings.curriculum[lang],
                          tabContent: (
                            // <Curriculum sections={state.course?.sections} />
                            <Curriculum course={state.course} />
                          ),
                        },
                        {
                          tabButton: strings.instructors[lang],
                          tabContent: (
                            <CourseInstructors
                              instructors={[state.course?.tutor]}
                              courseName={state.course?.subject.name[lang]}
                            />
                          ),
                        },
                      ]}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Loading>
        </div>
      </div>
    </div>
  );
}
