import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SelectInput from "components/SelectInput/SelectInput";
import Table from "components/Table/Table.js";
import React, { useEffect, useState } from "react";
import styles from "./studentsStyle.js";
import api from "services/api";
import { useSelector } from "react-redux";
import strings from "constants/strings";
import { translatePhoneNumber } from "utils/index.js";
import Loading from "components/Loading/Loading";
import ErrorModal from "components/ErrorModal/ErrorModal";

const useStyles = makeStyles(styles);

export default function Students(props) {
  const classes = useStyles();
  const { students } = props;

  let studentsData = [];

  const currentUser = useSelector((state) => state.auth);

  const lang = useSelector((state) => state.lang);

  const [courses, setCourses] = useState([]);

  const [courseStudents, setCourseStudents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPosts, setTotalPosts] = useState(0);

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const [courseSelect, setCourseSelect] = React.useState(0);

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          const response = (await api.getTutorCourses(currentUser.id)).data;
          setCourses(response);
        }
      } catch (err) {
        setShowErrorModal(true);
      }
    })();
  }, []);

  const handleSelectCourse = async (event) => {
    setLoading(true);
    setCourseSelect(event.target.value);
    try {
      const response = (await api.getCourseStudents(event.target.value, 1, 10))
        .data;
      setCourseStudents(response.data);
      setTotalPosts(response.total);
      setCurrentPage(1);
    } catch (err) {
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const paginate = async (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    try {
      const response = (
        await api.getCourseStudents(courseSelect, pageNumber, 10)
      ).data;
      setCourseStudents(response.data);
    } catch (err) {
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  courseStudents &&
    courseStudents.forEach((student, index) => {
      studentsData.push([
        <span key={index}>{`${student.firstName} ${student.lastName}`}</span>,
        <span key={index}>
          {translatePhoneNumber(student.countryCode + student.phone, lang)}
        </span>,
      ]);
    });

  let tutorCourses = [];
  if (courses) {
    courses.forEach((course) => {
      tutorCourses.push({
        value: course.id,
        name: `${course.subject.name[lang]} - ${
          strings.educations[course.education][lang]
        } - ${lang === "en" ? "Grade " : ""}${
          strings.grades[course.grade][lang]
        }`,
      });
    });
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
        <GridContainer justify="center" className={classes.selectRow}>
          <ErrorModal
            open={showErrorModal}
            onClose={() => setShowErrorModal(false)}
          />

          <GridItem
            xs={12}
            sm={12}
            md={2}
            className={classes.gridItem + " " + classes.labelContainer}
          >
            <p className={classes.label}>{strings.chooseCourse[lang]}</p>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.gridItem + " " + classes.selectContainer}
          >
            <SelectInput
              selectStyle={classes.select}
              placeholder={strings.selectCourse[lang]}
              data={tutorCourses}
              value={courseSelect}
              onSelect={handleSelectCourse}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={10}
            className={classes.gridItem}
            style={{ marginTop: 20 }}
          >
            <Loading loading={loading}>
              <Table
                tableHead={[strings.student[lang], strings.phone[lang]]}
                tableData={studentsData}
                tableHeaderColor="primaryLight"
                round
                backendPagination
                currentPage={currentPage}
                paginate={paginate}
                totalPosts={totalPosts}
              />
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
