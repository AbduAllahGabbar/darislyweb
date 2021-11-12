import { makeStyles } from "@material-ui/core/styles";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import StatCard from "components/StatCard/StatCard.js";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import styles from "./dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useHistory } from "react-router";
import ErrorModal from "components/ErrorModal/ErrorModal";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [state, setState] = useState({
    stats: null,
  });
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState();

  const history = useHistory();
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const lang = useSelector((state) => state.lang);

  const goToCourses = () => {
    history.push("instructors");
  };

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      try {
        const stats = (await api.getStudentStats()).data;
        stateHandler("stats", stats);
        setLoading(false);
      } catch (err) {
        setShowErrorModal(true);
      }
    })();
  }, []);

  const classes = useStyles();

  let courseElements = [];

  if (state.stats) {
    state.stats.courses.forEach((course, index) => {
      courseElements.push(
        <div key={index}>
          <h4 style={{ marginBottom: 10 }} className={classes.title}>
            <span>{course.subject[lang]}</span>&nbsp;
            <span>{strings.by[lang]}</span>&nbsp;
            <span>{course.tutor.firstName}</span>
            &nbsp;
            <span>{course.tutor.lastName}</span>
          </h4>
          <CustomLinearProgress
            variant="determinate"
            color="primary"
            completed={course.attendedSessions}
            total={course.totalSessions}
          />
        </div>
      );
    });
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
        <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />

        <div className={classes.statsContainer}>
          <StatCard
            sideBarColor="primary"
            fontColor="primary"
            name={strings.coursesCompleted[lang]}
            value={state.stats ? state.stats.coursesCompleted : 0}
          />
          <StatCard
            sideBarColor="warning"
            fontColor="warning"
            name={strings.coursesInProgress[lang]}
            value={state.stats ? state.stats.coursesInProgress : 0}
          />
          <StatCard
            sideBarColor="purple"
            fontColor="purple"
            name={strings.quizzesCompleted[lang]}
            value={state.stats ? state.stats.quizzesCompleted : 0}
          />
          <StatCard
            sideBarColor="rose"
            fontColor="rose"
            name={strings.quizzesInProgress[lang]}
            value={state.stats ? state.stats.quizzesInProgress : 0}
          />
        </div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={7} className={classes.background}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={2} className={classes.gridItemEnd}>
                <LibraryBooksIcon className={classes.iconColor} />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={6}
                className={classes.gridItemStart}
              >
                <h3 className={classes.headerMargin}>
                  {strings.enrollInCourse[lang]}
                </h3>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.gridItemStart}
              >
                <Button
                  round
                  className={classes.button}
                  color="primary"
                  onClick={goToCourses}
                >
                  {strings.goToCourseEnrollment[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={7} className={classes.gridItem}>
            {courseElements.length ? (
              <h3 style={{ marginBottom: 20 }} className={classes.title}>
                {strings.coursesProgress[lang]}
              </h3>
            ) : null}
            {loading ? (
              <div className={classes.skeleton}>
                <Skeleton animation="wave">
                  <h3>{strings.coursesProgress[lang]}</h3>
                </Skeleton>
                <Skeleton animation="wave">
                  <h4>Physics by Yasser Mourad</h4>
                </Skeleton>
                <Skeleton animation="wave" width="100%" height="50px" />
              </div>
            ) : (
              courseElements
            )}
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
