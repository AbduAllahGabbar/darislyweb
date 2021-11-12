import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Calendar from "components/Calendar/Calendar.js";
import Button from "components/CustomButtons/Button.js";
import CustomModal from "components/CustomModal/CustomModal.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import UnderlinedNavPills from "components/NavPills/UnderlinedNavPills.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import enums from "enums/index.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import { formatAMPM, translateNumber } from "utils/index.js";
import Courses from "./Sections/Courses/Courses.js";
import Dashboard from "./Sections/Dashboard/Dashboard.js";
import Orders from "./Sections/Orders/Orders.js";
import Settings from "./Sections/Settings/Settings.js";
import studentProfileStyle from "./studentProfileStyle.js";

const useStyles = makeStyles(studentProfileStyle);

export default function StudentProfile() {
  const classes = useStyles();

  const [state, setState] = useState({
    errorModal: false,
    calendarModal: false,
    daySessions: [],
    allSessions: [],
    selectedDate: null,
  });

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const currentUser = useSelector((state) => state.auth);

  const lang = useSelector((state) => state.lang);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const calendarSessions = (await api.getStudentSessions()).data;
        stateHandler("allSessions", calendarSessions);
      } catch (err) {
        console.log(err);
        stateHandler("errorModal", true);
      }
    })();
  }, []);

  const eventClick = (event) => {
    let eventObj = event.event;

    let daySessions = state.allSessions.filter(
      (session) => moment(session.from).format("YYYY-MM-DD") == eventObj.id
    );

    setState({ ...state, daySessions: daySessions, selectedDate: eventObj.id });
  };
  let sessionsData = [];
  state.daySessions.forEach((session, index) => {
    const lectureStarted = Date.now() > new Date(session.from);
    const lectureFinished = Date.now() > new Date(session.to);
    const notAttended =
      session.attendance.attended != enums.Attendance.PRESENT &&
      session.attendance.attended != enums.Attendance.LATE;
    const enabled =
      session.type === enums.CourseTypes.ONLINE &&
      lectureStarted &&
      (!lectureFinished || notAttended);

    const lectureVideoText =
      session.type !== enums.CourseTypes.ONLINE
        ? strings.noLectureVideo[lang]
        : !lectureStarted
        ? strings.scheduled[lang]
        : lectureFinished && !notAttended
        ? strings.ended[lang]
        : strings.goToLecture[lang];

    const lectureVideoButtonColor =
      session.type !== enums.CourseTypes.ONLINE
        ? "transparent"
        : !lectureStarted
        ? "secondary"
        : lectureFinished && !notAttended
        ? "danger"
        : "primary";

    console.log(session);

    sessionsData.push([
      // <span key={index}>{session.subject.name[lang]}</span>,
      // <span key={index}>
      //   <span>{session.tutor.firstName}</span>&nbsp;
      //   <span>{session.tutor.lastName}</span>
      // </span>,

      <span key={index}>
        <span key={index}>{session.subject.name[lang]}</span>
        <span>&nbsp; - &nbsp;</span>
        <span>{session.tutor.firstName}</span>&nbsp;
        <span>{session.tutor.lastName}</span>
      </span>,

      <span key={index}>{session.lecture.title}</span>,

      <span>
        {translateNumber(moment(session.from).format("YYYY-MM-DD"), lang)}
      </span>,
      <span key={index}>
        <span style={{ textTransform: "lowercase" }}>
          {formatAMPM(moment(session.from).format("HH:mm"), lang)}
        </span>
        <span>&nbsp; - &nbsp;</span>
        <span style={{ textTransform: "lowercase" }}>
          {formatAMPM(moment(session.to).format("HH:mm"), lang)}
        </span>
      </span>,
      <Button
        key={index}
        disabled={!enabled}
        color={lectureVideoButtonColor}
        className={classes.button}
        round
        onClick={() =>
          history.push({
            pathname: "/videolecture",
            state: { sessionId: session.id },
          })
        }
      >
        <span>{lectureVideoText}</span>
      </Button>,
    ]);
  });
  return (
    <div className={classes.root}>
      <ErrorModal
        open={state.errorModal}
        onClose={() => stateHandler("errorModal", false)}
      />
      <CustomModal
        open={state.calendarModal}
        onClose={() => stateHandler("calendarModal", false)}
      >
        <Calendar
          eventClick={eventClick}
          sessions={state.allSessions}
          display={state.calendarModal}
          selectedDate={state.selectedDate}
        ></Calendar>
        <Table
          tableHead={[
            strings.course[lang],
            strings.lecture[lang],
            strings.date[lang],
            strings.time[lang],
            strings.lectureVideo[lang],
          ]}
          tableData={sessionsData}
          tableHeaderColor="secondary"
          round
        />
      </CustomModal>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={10} sm={6} md={4} className={classes.profile}>
            <div>
              <div style={{ position: "relative" }}>
                {/* <img src={profile} alt="..." className={classes.image} /> */}
                <AccountCircleIcon className={classes.profileIcon} />
                <div className={classes.calendarContainer}>
                  <Button
                    justIcon
                    round
                    color="secondary"
                    className={classes.calendarButton}
                    onClick={() => stateHandler("calendarModal", true)}
                  >
                    <i
                      className={"fas fa-calendar-alt " + classes.calendarIcon}
                    ></i>
                  </Button>
                </div>
              </div>
              <h3
                className={classes.title}
              >{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
            </div>
          </GridItem>
        </GridContainer>
        <div className={classes.profileTabs}>
          <UnderlinedNavPills
            alignCenter
            color="secondary"
            active={0}
            tabs={[
              {
                tabButton: strings.dashboard[lang],
                tabContent: <Dashboard />,
              },
              {
                tabButton: strings.courses[lang],
                tabContent: <Courses />,
              },
              {
                tabButton: strings.orders[lang],
                tabContent: <Orders />,
              },
              {
                tabButton: strings.settings[lang],
                tabContent: <Settings />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
