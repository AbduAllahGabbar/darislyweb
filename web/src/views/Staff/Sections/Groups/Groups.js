import { Breadcrumbs, Fade, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttendanceTable from "components/AttendanceTable/AttendanceTable.js";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import NavPills from "components/NavPills/NavPills.js";
import Table from "components/Table/Table.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { formatAMPM, translateNumber } from "utils/index.js";
import styles from "./groupsStyle.js";
import { translatePhoneNumber } from "utils/index.js";
import SuccessModal from "components/SuccessModal/SuccessModal.js";

const useStyles = makeStyles(styles);

export default function Groups(props) {
  const classes = useStyles();
  const [activeView, setActiveView] = useState(0);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [state, setState] = useState({
    search: "",
    errorModal: false,
    groups: null,
    groupsCurrentPage: 1,
    selectedGroup: null,
    students: null,
    studentsCurrentPage: 1,
    sessions: [],
    selectedSlot: null,
    studentsAttendance: null,
  });
  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const lang = useSelector((state) => state.lang);
  useEffect(() => {
    (async () => {
      try {
        const groups = (await api.getCenterGroups()).data.data;
        stateHandler("groups", groups);
        setLoadingGroups(false);
      } catch (err) {
        stateHandler("errorModal", true);
      }
    })();
  }, []);
  let courseGroupsData = [];
  let filteredGroups = [];
  if (state.groups) {
    filteredGroups = state.groups.filter((group) => {
      return group.subject[lang]
        .toLowerCase()
        .includes(state.search.toLowerCase());
    });
  }

  const checkHandler = (index, attended) => {
    let allStudents = [...state.studentsAttendance];
    let selectedStudent = {
      ...allStudents[index],
      attended,
    };
    allStudents[index] = selectedStudent;
    stateHandler("studentsAttendance", allStudents);
  };

  const groupClickhandler = async (group) => {
    window.scrollTo(0, 0);
    setActiveView(1);
    try {
      const students = (await api.getCenterGroupStudents(group.id)).data.data;
      const sessions = (
        await api.getCenterGroupSessions(
          group.id,
          new Date().toISOString().slice(0, -1)
        )
      ).data.data;
      let selectedSlot = null;
      // if (sessions && sessions.length > 0) selectedSlot = sessions[0];
      setState({
        ...state,
        students,
        selectedGroup: group,
        sessions,
        selectedSlot,
      });
      setLoadingStudents(false);
    } catch (err) {
      console.log(err);
      stateHandler("errorModal", true);
    }
  };
  let studentsData = [];
  if (state.students) {
    state.students.forEach((student, index) => {
      studentsData.push([
        <AccountCircleIcon className={classes.icon} />,
        <span key={index}>{`${student.firstName} ${student.lastName}`}</span>,
        <span key={index}>
          {translatePhoneNumber(student.countryCode + student.phone, lang)}
        </span>,
      ]);
    });
  }
  let groupElement = [];
  if (state.selectedGroup) {
    state.selectedGroup.weekDays.forEach((day, dayIndex) => {
      groupElement.push(
        <div className={classes.weekDayContainer} key={dayIndex}>
          <span className={classes.weekDay}>
            {strings.shortDays[lang][day.day]}
          </span>
          <Button disabled color={"primary"} className={classes.time} round>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(day.from, lang)}
            </span>
            <span>&nbsp; - &nbsp;</span>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(day.to, lang)}
            </span>
          </Button>
        </div>
      );
    });
  }

  const breadcrumbsHandler = () => {
    window.scrollTo(0, 0);
    setActiveView(0);
    setLoadingStudents(true);
    setState({
      ...state,
      search: "",
      groupsCurrentPage: 1,
      selectedGroup: null,
      students: null,
      studentsCurrentPage: 1,
      studentsAttendance: null,
    });
  };

  filteredGroups.forEach((group, index) => {
    let weekDaysElement = [];
    group.weekDays.forEach((day, dayIndex) => {
      weekDaysElement.push(
        <div className={classes.weekDayContainer} key={dayIndex}>
          <span className={classes.weekDay}>
            {strings.shortDays[lang][day.day]}
          </span>
          <Button disabled color={"primary"} className={classes.time} round>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(day.from, lang)}
            </span>
            <span>&nbsp; - &nbsp;</span>
            <span style={{ textTransform: "lowercase" }}>
              {formatAMPM(day.to, lang)}
            </span>
          </Button>
        </div>
      );
    });
    courseGroupsData.push([
      <AccountCircleIcon className={classes.icon} />,
      <span
        key={index}
        className={classes.link}
        onClick={() => groupClickhandler(group)}
      >
        {group.tutor.firstName + " " + group.tutor.lastName}
      </span>,
      <span key={index}>{group.subject[lang]}</span>,
      <span key={index}>{strings.grades[group.course.grade][lang]}</span>,
      <span key={index}>
        {strings.educations[group.course.education][lang]}
      </span>,
      <span key={index}>
        {translateNumber(group.numberOfStudents.toString(), lang)}
      </span>,
      <div key={index}>{weekDaysElement}</div>,
    ]);
  });

  const handleSearchChange = (event) => {
    setState({ ...state, search: event.target.value, groupsCurrentPage: 1 });
  };

  const setSelectedSlot = async (session) => {
    try {
      const studentsAttendance = (
        await api.getCenterSessionAttendance(session.id)
      ).data.data;
      setState({
        ...state,
        studentsAttendance,
        selectedSlot: session,
      });
      setLoadingStudents(false);
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
        const response = await api.updateCenterAttendance(
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
    <div>
      <ErrorModal
        open={state.errorModal}
        onClose={() => stateHandler("errorModal", false)}
      />
      <Fade
        className={classes.fade}
        style={{ display: activeView === 0 ? "block" : "none" }}
        in={activeView === 0}
        timeout={600}
      >
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
            <GridContainer justify="center" className={classes.selectRow}>
              <GridItem
                xs={12}
                sm={12}
                md={2}
                className={classes.gridItem + " " + classes.labelContainer}
              >
                <p className={classes.label}>{strings.subjectName[lang]}</p>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={2}
                className={classes.gridItem + " " + classes.selectContainer}
              >
                <InputWithLabel
                  placeholder={strings.search[lang]}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses,
                  }}
                  formControlStyle={classes.formControl}
                  inputStyle={classes.input}
                  value={state.search}
                  inputProps={{
                    onChange: handleSearchChange,
                  }}
                />
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
                <Loading
                  loading={loadingGroups}
                  style={{
                    display: activeView === 0 ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Table
                    tableHead={[
                      strings.photo[lang],
                      strings.tutor[lang],
                      strings.subject[lang],
                      strings.grade[lang],
                      strings.education[lang],
                      strings.enrolled[lang],
                      strings.group[lang],
                      ,
                    ]}
                    tableData={courseGroupsData}
                    tableHeaderColor="secondary"
                    round
                    pagination
                    currentPage={state.groupsCurrentPage}
                    paginate={(pageNumber) => {
                      window.scrollTo(0, 0);
                      stateHandler("groupsCurrentPage", pageNumber);
                    }}
                  />
                </Loading>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Fade>
      <Fade
        className={classes.fade}
        style={{ display: activeView === 1 ? "block" : "none" }}
        in={activeView === 1}
        timeout={600}
      >
        <Loading
          loading={loadingStudents}
          style={{
            display: activeView === 1 ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuccessModal
            onClose={() => setUpdatedSuccess(false)}
            open={updatedSuccess}
            message={strings.attendanceUpdatedSuccessfully[lang]}
          />
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
              <GridContainer justify="center" className={classes.selectRow}>
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.gridItem + " " + classes.justtifyCenter}
                >
                  <Breadcrumbs separator="/" aria-label="breadcrumb">
                    <Link
                      className={classes.breadcrumbLink}
                      onClick={breadcrumbsHandler}
                      color="inherit"
                    >
                      {strings.groups[lang]}
                    </Link>
                    <span>
                      {state.selectedGroup?.tutor.firstName +
                        " " +
                        state.selectedGroup?.tutor.lastName}
                    </span>
                  </Breadcrumbs>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={10} sm={6} md={4} className={classes.profile}>
                  <div>
                    <div style={{ position: "relative" }}>
                      {/* <img
                      src={courseGroups[0].photo}
                      alt="..."
                      className={classes.image}
                    /> */}
                      <AccountCircleIcon
                        className={classes.icon}
                        style={{ fontSize: 175 }}
                      />
                    </div>
                    <h3 className={classes.title}>
                      {state.selectedGroup?.subject[lang]} &nbsp;
                      <span>{strings.by[lang]}</span>&nbsp;
                      <span>{state.selectedGroup?.tutor.firstName}</span>
                      &nbsp;
                      <span>{state.selectedGroup?.tutor.lastName}</span>
                    </h3>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={2}
                  className={classes.groupInfoContainer}
                >
                  <span className={classes.groupInfo}>
                    {strings.education[lang]}:{" "}
                    {state.selectedGroup
                      ? strings.educations[
                          state.selectedGroup.course.education
                        ][lang]
                      : ""}
                  </span>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={2}
                  className={classes.groupInfoContainer}
                >
                  <span className={classes.groupInfo}>
                    {strings.grade[lang]}:{" "}
                    {state.selectedGroup
                      ? strings.grades[state.selectedGroup.course.grade][lang]
                      : ""}
                  </span>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={2}
                  className={classes.groupInfoContainer}
                >
                  <span className={classes.groupInfo}>
                    {strings.group[lang]}: &nbsp;
                  </span>
                  <div>{groupElement}</div>
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
                  <NavPills
                    alignCenter
                    color="secondary"
                    active={0}
                    tabs={[
                      {
                        tabButton: strings.students[lang],
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem
                              xs={12}
                              sm={12}
                              md={8}
                              className={classes.gridItem}
                              style={{ marginTop: 20 }}
                            >
                              <Table
                                tableHead={[
                                  strings.photo[lang],
                                  strings.name[lang],
                                  strings.photo[lang],
                                ]}
                                tableData={studentsData}
                                tableHeaderColor="secondary"
                                round
                                pagination
                                currentPage={state.studentsCurrentPage}
                                paginate={(pageNumber) =>
                                  stateHandler(
                                    "studentsCurrentPage",
                                    pageNumber
                                  )
                                }
                              />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabButton: strings.attendance[lang],
                        tabContent: (
                          <AttendanceTable
                            students={state.studentsAttendance}
                            sessions={state.sessions}
                            selectedSlot={state.selectedSlot}
                            slotClickHandler={setSelectedSlot}
                            checkHandler={checkHandler}
                            saveHandler={saveHandler}
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
      </Fade>
    </div>
  );
}
