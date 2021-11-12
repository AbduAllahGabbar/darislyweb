import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { translateNumber } from "utils/index.js";
import styles from "./coursesStyle.js";
import StudentQuizzes from "./Quizzes/StudentQuizzes.js";
import Material from "./Material/Material";

const useStyles = makeStyles(styles);

export default function Courses(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    courses: null,
  });

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const courses = (await api.getStudentCourses()).data;
        stateHandler("courses", courses);
      } catch (err) {
        setShowErrorModal(true);
      }
    })();
  }, []);

  const lang = useSelector((state) => state.lang);

  let coursesData = [];

  if (state.courses) {
    state.courses.forEach((course, index) => {
      coursesData.push([
        <span key={index}>{course.subject[lang]}</span>,
        <span key={index}>
          <span>{course.tutor.firstName}</span>&nbsp;
          <span>{course.tutor.lastName}</span>
        </span>,
        <span key={index}>
          {translateNumber(
            course.attendedSessions + " / " + course.totalSessions,
            lang,
            true
          )}
        </span>,
        // <span key={index}>{strings.courseTypes[course.type][lang]}</span>,
      ]);
    });
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <NavPills
          alignCenter
          color="secondary"
          tabs={[
            {
              tabButton: strings.courses[lang],
              tabContent: (
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={10}
                    className={classes.gridItem}
                    style={{ marginTop: 20 }}
                  >
                    <ErrorModal
                      open={showErrorModal}
                      onClose={() => setShowErrorModal(false)}
                    />

                    <Table
                      tableHead={[
                        strings.subject[lang],
                        strings.tutor[lang],
                        strings.progress[lang],
                      ]}
                      tableData={coursesData}
                      tableHeaderColor="secondary"
                      round
                    />
                  </GridItem>
                </GridContainer>
              ),
            },
            {
              tabButton: strings.quizzes[lang],
              tabContent: <StudentQuizzes></StudentQuizzes>,
            },
            {
              tabButton: strings.material[lang],
              tabContent: <Material />,
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
