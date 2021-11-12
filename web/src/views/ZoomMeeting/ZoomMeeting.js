import { makeStyles } from "@material-ui/core/styles";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import zoomMeetingStyle from "./zoomMeetingStyle";

const apiKey = process.env.REACT_APP_ZOOM_API_KEY;
const hostUrl = process.env.REACT_APP_API_HOST;
const useStyles = makeStyles(zoomMeetingStyle);

export default function ZoomMeeting() {
  const currentUser = useSelector((state) => state.auth);
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const [errorModal, setErrorModal] = useState(false);

  const meetConfig = {
    meetingNumber: location.state ? location.state.meetingId : null,
    uname: `${currentUser?.firstName}_${currentUser.lastName}`,
    email: currentUser?.email,
    password: location.state ? location.state.meetingPassword : null,
  };

  const handleClose = () => {
    setErrorModal(false);
    history.push({
      pathname: "/",
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <ErrorModal open={errorModal} onClose={handleClose} />
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={10}>
            <iframe
              allow="microphone; fullscreen;"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className={classes.iframe}
              src={`${hostUrl}/zoom/meeting?email=${meetConfig.email}&uname=${meetConfig.uname}&browserVersion=${btoa(meetConfig.meetingNumber)}&audioEncoding=${btoa(meetConfig.password)}`}
            ></iframe>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
