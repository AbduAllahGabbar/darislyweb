import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Calendar from "components/Calendar/Calendar.js";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal.js";
import Loading from "components/Loading/Loading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import enums from "enums";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./attendanceTableStyle.js";
import { formatAMPM } from "utils/index.js";
import { getDateString } from "utils/index.js";
import { translateNumber } from "utils/index.js";
import moment from "moment";

const useStyles = makeStyles(styles);
const educations = {
  ar: strings.educations.map((education) => education.ar),
  en: strings.educations.map((education) => education.en),
};

export default function AttendanceTable(props) {
  const classes = useStyles();
  const {
    students,
    checkHandler,
    sessions,
    selectedSlot,
    slotClickHandler,
    saveHandler,
    tutor,
  } = props;
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [daySessions, setDaySessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const lang = useSelector((state) => state.lang);
  let studentsData = [];

  if (students) {
    students.forEach((student, index) => {
      studentsData.push([
        <div key={index}>
          <span>
            {student.student.firstName + " " + student.student.lastName}
          </span>
        </div>,
        <div
          key={index}
          onClick={() => checkHandler(index, enums.Attendance.PRESENT)}
          className={classes.checkContainer}
        >
          {student.attended === enums.Attendance.PRESENT ? (
            <CheckCircleIcon className={classes.checkIcon} />
          ) : null}
        </div>,
        <div
          onClick={() => checkHandler(index, enums.Attendance.LATE)}
          key={index}
          className={classes.checkContainer}
        >
          {student.attended === enums.Attendance.LATE ? (
            <CheckCircleIcon className={classes.checkIcon} />
          ) : null}
        </div>,
        <div
          onClick={() => checkHandler(index, enums.Attendance.ABSENT)}
          key={index}
          className={classes.checkContainer}
        >
          {student.attended === enums.Attendance.ABSENT ? (
            <CheckCircleIcon className={classes.checkIcon} />
          ) : null}
        </div>,
        <div
          onClick={() => checkHandler(index, enums.Attendance.EXCUSED)}
          key={index}
          className={classes.checkContainer}
        >
          {student.attended === enums.Attendance.EXCUSED ? (
            <CheckCircleIcon className={classes.checkIcon} />
          ) : null}
        </div>,
      ]);
    });
  }

  const dayClickHandler = (event) => {
    let eventObj = event.event;
    let daySessions = sessions.filter(
      (session) => moment(session.from).format("YYYY-MM-DD") == eventObj.id
    );
    setDaySessions(daySessions);
    setSelectedDate(eventObj.id);
  };

  let daySessionsData = [];
  daySessions.forEach((session, index) => {
    let fromDatetime = new Date(session.from);
    let toDatetime = new Date(session.to);
    daySessionsData.push([
      <span key={index}>{translateNumber(session.id.toString(), lang)}</span>,
      <span key={index}>{session.lecture.title}</span>,
      tutor ? (
        <span key={index}>{educations[lang][session.education]}</span>
      ) : (
        ""
      ),
      tutor ? (
        <span key={index}>{strings.courseTypes[session.type][lang]}</span>
      ) : (
        ""
      ),
      <span key={index}>
        <div className={classes.datetimeContainer}>
          <div>
            {strings.from[lang]}
            <span className={classes.date}>
              {translateNumber(
                fromDatetime.getDate() +
                  "/" +
                  (fromDatetime.getMonth() + 1) +
                  "/" +
                  fromDatetime.getFullYear(),
                lang,
                true
              )}
            </span>
          </div>
          <Button disabled color={"primary"} className={classes.time} round>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(
                `${fromDatetime.getHours()}:${fromDatetime.getMinutes()}`,
                lang
              )}
            </span>
          </Button>
        </div>
        <div className={classes.datetimeContainer}>
          <div>
            {strings.to[lang]}
            <span className={classes.date}>
              {translateNumber(
                toDatetime.getDate() +
                  "/" +
                  (toDatetime.getMonth() + 1) +
                  "/" +
                  toDatetime.getFullYear(),
                lang,
                true
              )}
            </span>
          </div>
          <Button disabled color={"primary"} className={classes.time} round>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(
                `${toDatetime.getHours()}:${toDatetime.getMinutes()}`,
                lang
              )}
            </span>
          </Button>
        </div>
      </span>,
      <Button
        onClick={() => {
          slotClickHandler(session);
          setModal(false);
        }}
        style={{ textTransform: "uppercase" }}
        key={index}
        color="primary"
        className={classes.button}
        round
      >
        {strings.selectSlot[lang]}
      </Button>,
    ]);
  });

  const saveClickHandler = async () => {
    setLoading(true);
    await saveHandler();
    setLoading(false);
  };

  return (
    <div>
      <CustomModal open={modal} onClose={() => setModal(false)}>
        <Calendar
          eventClick={dayClickHandler}
          sessions={sessions ? sessions : []}
          display={modal}
          selectedDate={selectedDate}
        ></Calendar>
        <Table
          tableHead={[
            strings.id[lang],
            strings.lectureName[lang],
            tutor ? strings.education[lang] : "",
            tutor ? strings.type[lang] : "",
            strings.date[lang],
            " ",
          ]}
          tableData={daySessionsData}
          tableHeaderColor="secondary"
          round
          noDataMessage={strings.pleaseSelectDate[lang]}
        />
      </CustomModal>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <GridContainer justify="center" className={classes.selectRow}>
            <GridItem
              xs={12}
              sm={12}
              md={2}
              className={classes.gridItem + " " + classes.labelContainer}
            >
              <p className={classes.label}>{strings.selectSession[lang]}</p>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={5}
              className={classes.gridItem + " " + classes.selectContainer}
            >
              <Button
                onClick={() => setModal(true)}
                color="primary"
                className={classes.button}
                round
              >
                {selectedSlot ? (
                  <span>
                    <span>
                      {getDateString(new Date(selectedSlot.from), lang)}
                    </span>
                    <span>&nbsp; ( &nbsp;</span>
                    <span style={{ textTransform: "uppercase" }}>
                      {formatAMPM(
                        `${new Date(selectedSlot.from).getHours()}:${new Date(
                          selectedSlot.from
                        ).getMinutes()}`,
                        lang
                      )}
                    </span>
                    <span>&nbsp; ) &nbsp;</span>
                  </span>
                ) : (
                  <span>{strings.selectSession[lang]}</span>
                )}
              </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
              <Loading style={{ height: 10 }} loading={loading}>
                <Button
                  onClick={saveClickHandler}
                  color="primary"
                  className={classes.button}
                  round
                >
                  {strings.save[lang]}
                </Button>
              </Loading>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={classes.gridItem}
              style={{ marginTop: 20 }}
            >
              <Table
                tableHead={[
                  strings.student[lang],
                  strings.attendanceStates[enums.Attendance.PRESENT][lang],
                  strings.attendanceStates[enums.Attendance.LATE][lang],
                  strings.attendanceStates[enums.Attendance.ABSENT][lang],
                  strings.attendanceStates[enums.Attendance.EXCUSED][lang],
                ]}
                tableData={studentsData}
                tableHeaderColor="primaryLight"
                round
                pagination
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
