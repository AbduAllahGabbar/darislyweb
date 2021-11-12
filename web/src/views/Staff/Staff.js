import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import UnderlinedNavPills from "components/NavPills/UnderlinedNavPills.js";
import PasswordSettings from "components/PasswordSettings/PasswordSettings";
import strings from "constants/strings.js";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Groups from "./Sections/Groups/Groups";
import Students from "./Sections/Students/Students";
import styles from "./staffStyle.js";

const useStyles = makeStyles(styles);

export default function Staff() {
  const classes = useStyles();

  const [state, setState] = useState({
    errorModal: false,
    calendarModal: false,
    daySessions: [],
    allSessions: [],
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
      <Header
        links={<HeaderLinks dropdownHoverColor="gray" />}
        fixed
        color="secondary"
      />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={10} sm={6} md={4} className={classes.profile}>
            <h3
              className={classes.title}
            >{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
          </GridItem>
        </GridContainer>
        <div className={classes.profileTabs}>
          <UnderlinedNavPills
            alignCenter
            color="secondary"
            active={0}
            tabs={[
              {
                tabButton: strings.students[lang],
                tabContent: <Students />,
              },
              {
                tabButton: strings.groups[lang],
                tabContent: <Groups />,
              },
              {
                tabButton: strings.password[lang],
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem style={{ marginTop: 20 }} xs={10} sm={10} md={10}>
                      <PasswordSettings />
                    </GridItem>
                  </GridContainer>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
