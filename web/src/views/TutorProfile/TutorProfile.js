import { makeStyles } from "@material-ui/core/styles";
import studentPhoto from "assets/images/instructor3.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import api from "services/api";
import UnderlinedNavPills from "components/NavPills/UnderlinedNavPills.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Communication from "./Sections/Communication/Communication.js";
import Dashboard from "./Sections/Dashboard/Dashboard.js";
import Settings from "./Sections/Settings/Settings";
import Courses from "./Sections/Courses/Courses";
import tutorProfileStyle from "./tutorProfileStyle.js";
import ErrorModal from "components/ErrorModal/ErrorModal.js";
import strings from "constants/strings";

const useStyles = makeStyles(tutorProfileStyle);

export default function TutorProfile() {
  const classes = useStyles();

  const [state, setState] = useState({
    errorModal: false,
    stats: null,
  });

  const stateHandler = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={classes.root}>
      <ErrorModal
        open={state.errorModal}
        onClose={() => stateHandler("errorModal", false)}
      />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={10} sm={6} md={4} className={classes.profile}>
            <div>
              <div style={{ position: "relative" }}>
                {/* <img src={profile} alt="..." className={classes.image} /> */}
                <AccountCircleIcon className={classes.icon} />
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
                tabContent: <Courses/>,
              },
              {
                tabButton: strings.communication[lang],
                tabContent: <Communication />,
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
