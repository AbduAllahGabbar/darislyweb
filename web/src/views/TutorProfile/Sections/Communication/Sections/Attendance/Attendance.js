import { makeStyles } from "@material-ui/core/styles";
import AttendanceTable from "components/AttendanceTable/AttendanceTable.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SuccessModal from "components/SuccessModal/SuccessModal.js";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import styles from "./attendanceStyle.js";

const useStyles = makeStyles(styles);

export default function Attendance(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    errorModal: false,
    sessions: [],
    selectedSlot: null,
    studentsAttendance: null,
  });
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const lang = useSelector((state) => state.lang);
  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  useEffect(() => {
    (async () => {
      try {
        const sessions = (await api.getTutorSessions()).data.data;
        let selectedSlot = null;
        setState({
          ...state,
          sessions,
          selectedSlot,
        });
      } catch (err) {
        stateHandler("errorModal", true);
      }
    })();
  }, []);
  const checkHandler = (index, attended) => {
    let allStudents = [...state.studentsAttendance];
    let selectedStudent = {
      ...allStudents[index],
      attended,
    };
    allStudents[index] = selectedStudent;
    stateHandler("studentsAttendance", allStudents);
  };

  const setSelectedSlot = async (session) => {
    try {
      const studentsAttendance = (
        await api.getTutorSessionAttendance(session.id)
      ).data.data;
      setState({
        ...state,
        studentsAttendance,
        selectedSlot: session,
      });
    } catch (err) {
      stateHandler("errorModal", true);
    }
  };

  const saveHandler = async () => {
    if (state.studentsAttendance && state.studentsAttendance.length > 0) {
      const updatedAttendacne = state.studentsAttendance.map((student) => {
        return { studentId: student.student.id, attended: student.attended };
      });
      try {
        const response = await api.updateTutorAttendance(
          state.selectedSlot.id,
          updatedAttendacne
        );
        setUpdatedSuccess(true);
      } catch (err) {
        stateHandler("errorModal", true);
      }
    }
  };

  return (
    <GridContainer justify="center">
      <ErrorModal
        open={state.errorModal}
        onClose={() => stateHandler("errorModal", false)}
      />
      <SuccessModal
        open={updatedSuccess}
        onClose={() => setUpdatedSuccess(false)}
        message={strings.attendanceUpdatedSuccessfully[lang]}
      />
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.gridItem}
            style={{ marginTop: 20 }}
          >
            <AttendanceTable
              students={state.studentsAttendance}
              sessions={state.sessions}
              selectedSlot={state.selectedSlot}
              slotClickHandler={setSelectedSlot}
              checkHandler={checkHandler}
              saveHandler={saveHandler}
              tutor
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
