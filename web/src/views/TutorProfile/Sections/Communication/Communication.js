import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import strings from "constants/strings";
import styles from "./communicationStyle.js";
import Attendance from "./Sections/Attendance/Attendance";
import Announcements from "./Sections/Announcements/Announcements";
import Quizzes from "./Sections/Quizzes/Quizzes";
import Material from "./Sections/Material/Material";

const useStyles = makeStyles(styles);

export default function Communication(props) {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
        <NavPills
          alignCenter
          color="secondary"
          active={0}
          tabs={[
            {
              tabButton: strings.quizzes[lang],
              tabContent: <Quizzes />,
            },
            {
              tabButton: strings.material[lang],
              tabContent: <Material />,
            },
            {
              tabButton: strings.attendance[lang],
              tabContent: <Attendance />,
            },
            {
              tabButton: strings.announcements[lang],
              tabContent: <Announcements />,
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
