import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import strings from "constants/strings";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import api from "services/api";
import { formatAMPM, getDateString, translateNumber } from "utils";
import videoLectureStyle from "./videoLectureStyle";
import enums from "enums";

const useStyles = makeStyles(videoLectureStyle);

export default function VideoLecture() {
  const history = useHistory();
  const classes = useStyles();
  let location = useLocation();
  const [videoError, setVideoError] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [canSchedule, setCanSchedule] = useState(false);

  const lang = useSelector((state) => state.lang);

  const handleClose = () => {
    setErrorModal(false);
    history.push({
      pathname: "/",
    });
  };

  const handleHome = () => {
    history.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.sessionId) {
      updateSession();
    } else {
      setVideoError(2);
      setLoading(false);
    }
  }, []);

  const updateSession = async () => {
    try {
      let session = (await api.getSessionDetails(location.state.sessionId))
        .data;
      session.from = moment(session.from);
      session.to = moment(session.to);
      let currentDateTime = moment();
      let videoStartTime = currentDateTime.diff(session.from, "minutes");
      const remainingTime = session.to.diff(currentDateTime);
      const isLectureTime =
        currentDateTime.isBetween(session.from, session.to) ||
        currentDateTime.isSame(session.from);
      session.lecture.videoUrl = session.lecture.videoUrl
        ? `https://player.vimeo.com/video/${session.lecture.videoUrl}?autoplay=1#t=${videoStartTime}m`
        : null;
      setSessionInfo(session);
      const notAttended =
        session.attendances.attended != enums.Attendance.PRESENT &&
        session.attendances.attended != enums.Attendance.LATE;
      setCanSchedule(session.to < moment() && notAttended);
      setLoading(false);
      if (!session.lecture.videoUrl) {
        setErrorModal(true);
      } else if (!isLectureTime) {
        setVideoError(1);
      } else {
        setVideoError(0);
        if (notAttended) {
          await api.addStudentAttendance(session.id);
        }
        const timeout = setTimeout(() => {
          setVideoError(1);
        }, remainingTime);
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.log(err);
      setErrorModal(true);
    }
  };

  const scheduleSession = async (sessionId) => {
    await api.scheduleSession(sessionId);
    updateSession();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <ErrorModal open={errorModal} onClose={handleClose} />
        <Loading loading={loading} style={{ minHeight: "80vh" }}>
          <GridContainer justify="center">
            <GridItem xs={8} sm={8} md={8} className={classes.center}>
              <h1 className={classes.title}>
                {sessionInfo?.course.subject[lang]}
              </h1>
              <h4 className={classes.text}>
                {sessionInfo?.course.description}
              </h4>
            </GridItem>
          </GridContainer>
          {canSchedule ? (
            <GridContainer justify="center">
              <GridItem xs={8} sm={8} md={8} className={classes.center}>
                <h1 className={classes.title}>
                  {strings.scheduleSessionMessage[lang](
                    translateNumber(sessionInfo.duration, lang)
                  )}
                </h1>
                <Button
                  onClick={() => scheduleSession(sessionInfo.id)}
                  color="primary"
                  className={classes.button}
                  round
                >
                  {strings.scheduleNow[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          ) : (
            <div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  {videoError > 0 ? (
                    <h1 className={classes.title}>
                      {videoError == 1
                        ? `${strings.videoNotAvailable[lang]} ${getDateString(
                            sessionInfo.from.toDate(),
                            lang
                          )} ${formatAMPM(
                            sessionInfo.from.format("HH:mm"),
                            lang
                          )} - ${formatAMPM(
                            sessionInfo.to.format("HH:mm"),
                            lang
                          )}`
                        : strings.videoInvalidLink[lang]}
                    </h1>
                  ) : (
                    <iframe
                      className={classes.iframe}
                      src={sessionInfo?.lecture.videoUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>
                  )}
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8} className={classes.center}>
                  <h2 className={classes.subtitle}>
                    {sessionInfo?.lecture.title}
                  </h2>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={10} sm={8} md={4}>
                  <Button
                    onClick={handleHome}
                    color="primary"
                    className={classes.button}
                    round
                  >
                    {strings.homeNavLink[lang]}
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
}
