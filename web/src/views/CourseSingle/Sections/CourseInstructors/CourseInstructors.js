import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import React from "react";
import { useSelector } from "react-redux";
import { translateNumber } from "utils/index.js";
import styles from "./courseInstructorsStyle.js";

const useStyles = makeStyles(styles);

export default function CourseInstructors(props) {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  const { instructors, courseName } = props;
  let instructorsArray = [];
  if (instructors[0]) {
    instructors.forEach((instructor, index) => {
      instructorsArray.push(
        <div key={index} className={classes.instructor}>
          <div className={classes.instructorHeader}>
            {instructor.hasImage ? (
              <img
                src={instructor.imageUrl}
                alt="..."
                className={classes.img}
              />
            ) : (
              <AccountCircleIcon className={classes.icon} />
            )}
            <div className={classes.instructorInfo}>
              <h2 className={classes.name}>
                <span>{instructor.firstName}</span>
                &nbsp;
                <span>{instructor.lastName}</span>
              </h2>
              <div className={classes.flexRow}>
                <h4 className={classes.subtitle}>{courseName}</h4>
                <div className={classes.rating}>
                  <Rating
                    name="read-only"
                    value={0}
                    precision={0.5}
                    readOnly
                    icon={<StarRoundedIcon fontSize="inherit" />}
                    emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                  />
                  <span dir="auto" className={classes.numberFont}>
                    ({translateNumber("0", lang)})
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={classes.about}>{instructor.about}</div> */}
        </div>
      );
    });
  }

  return (
    <GridContainer justify="center">
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.gridItem}
        style={{ marginTop: 20 }}
      >
        <Loading loading={instructors[0] ? false : true}>
          {instructorsArray}
        </Loading>
      </GridItem>
    </GridContainer>
  );
}
