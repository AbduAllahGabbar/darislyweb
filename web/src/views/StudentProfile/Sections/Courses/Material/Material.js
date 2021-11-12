import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import MaterialModal from "components/MaterialModal/MaterialModal";
import Table from "components/Table/Table";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import styles from "./materialStyle.js";

const useStyles = makeStyles(styles);

export default function Material(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          try {
            setLoading(true);
            const response = (await api.getStudentCourses()).data;
            setCourses(response);
          } catch (err) {
          } finally {
            setLoading(false);
          }
        }
      } catch (err) {}
    })();
  }, []);

  const handleOpenMaterialModal = (courseId, showModalHandler) => async () => {
    setSelectedCourseId(courseId);
    showModalHandler(true);
  };

  let coursesData = [];

  courses &&
    courses.forEach((course, index) => {
      coursesData.push([
        <span
          key={index}
        >{`${course.subject[lang]} - ${course.tutor.firstName} ${course.tutor.lastName}`}</span>,
        <div className={classes.buttonsContainer}>
          <Button
            key="manage-btn"
            color="primary"
            className={classes.button}
            onClick={handleOpenMaterialModal(course.id, setShowMaterialModal)}
            round
          >
            <span>{strings.viewMaterial[lang]}</span>
          </Button>
        </div>,
      ]);
    });

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <GridContainer justify="center" className={classes.selectRow}>
          <GridItem xs={12} sm={8} md={10} className={classes.gridItem}>
            <Loading loading={loading}>
              <Table
                tableHead={[strings.course[lang], " "]}
                tableData={coursesData}
                tableHeaderColor="primaryLight"
                round
                pagination
              />

              <MaterialModal
                open={showMaterialModal}
                onClose={() => setShowMaterialModal(false)}
                courseId={selectedCourseId}
              />
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
