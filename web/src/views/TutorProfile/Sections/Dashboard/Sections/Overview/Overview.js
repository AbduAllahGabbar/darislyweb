import { makeStyles } from "@material-ui/core/styles";
import CourseCard from "components/CourseCard/CourseCard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import StatCard from "components/StatCard/StatCard.js";
import React from "react";
import styles from "./overviewStyle.js";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings";
import { useSelector } from "react-redux";
import { string } from "prop-types";

const useStyles = makeStyles(styles);

export default function Overview(props) {
  const classes = useStyles();
  const { stats, loading } = props;
  const lang = useSelector((state) => state.lang);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
            <Loading loading={loading}>
              <div className={classes.statsContainer}>
                <StatCard
                  name={strings.enrolledInCourses[lang]}
                  value={stats?.numberOfEnrolled}
                />
                <StatCard
                  name={strings.totalRevenue[lang]}
                  value={Number(stats?.totalRevenue?.toFixed(2) || 0)}
                />
              </div>
            </Loading>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
            {/* <h3 className={classes.title}>Courses</h3>
            <div className={classes.coursesContainer}>
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div> */}
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
