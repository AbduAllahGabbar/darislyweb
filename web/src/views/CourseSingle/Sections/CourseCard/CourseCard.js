import { makeStyles } from "@material-ui/core/styles";
import ClockIcon from "@material-ui/icons/AccessTime";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PeopleIcon from "@material-ui/icons/People";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import School from "@material-ui/icons/School";
import Rating from "@material-ui/lab/Rating";
import videoThumbnail from "assets/images/video-thumbnail.jpeg";
import Button from "components/CustomButtons/Button.js";
import React from "react";
import styles from "./courseCardStyle.js";
import { translateNumber } from "utils/index.js";
import strings from "constants/strings.js";
import { useSelector } from "react-redux";
import enums from "enums";

const useStyles = makeStyles(styles);
const educations = {
  ar: strings.educations.map((education) => education.ar),
  en: strings.educations.map((education) => education.en),
};
const grades = {
  ar: strings.grades.map((grade) => grade.ar),
  en: strings.grades.map((grade) => grade.en),
};

export default function CourseCard(props) {
  const classes = useStyles();
  const { course, onEnroll } = props;
  const lang = useSelector((state) => state.lang);
  const currentUser = useSelector((state) => state.auth);

  return (
    <div className={classes.root}>
      <div
        className={classes.video}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.4)), url(${videoThumbnail})`,
        }}
      >
        {/* <i className={"fas fa-play-circle " + classes.playIcon} /> */}
      </div>
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
      <div className={classes.attribute}>
        <ClockIcon className={classes.attributeIcon} />
        <span className={classes.attrName}>{strings.duration[lang]}</span>
        <span className={classes.mlAuto}>
          <span>{translateNumber(course?.duration.toString(), lang)}</span>{" "}
          <span>{strings.weeks[lang]}</span>
        </span>
      </div>
      <div className={classes.attribute}>
        <LibraryBooksIcon className={classes.attributeIcon} />
        <span className={classes.attrName}>{strings.lectures[lang]}</span>
        <span className={classes.mlAuto}>
          {translateNumber(course?.lecturesCount.toString(), lang)}
        </span>
      </div>
      <div className={classes.attribute}>
        <FormatListBulletedIcon className={classes.attributeIcon} />
        <span className={classes.attrName}>{strings.quizzes[lang]}</span>
        <span className={classes.mlAuto}>{translateNumber("0", lang)}</span>
      </div>
      <div className={classes.attribute}>
        <PeopleIcon className={classes.attributeIcon} />
        <span className={classes.attrName}>{strings.grade[lang]}</span>
        <span className={classes.mlAuto}>{grades[lang][course?.grade]}</span>
      </div>
      <div className={classes.attribute}>
        <School className={classes.attributeIcon} />
        <span className={classes.attrName}>{strings.education[lang]}</span>
        <span className={classes.mlAuto}>
          {educations[lang][course?.education]}
        </span>
      </div>
      {/* <div className={classes.attribute}>
        <i
          className={"fas fa-users " + classes.attributeIcon}
          style={{ fontSize: "1.2rem", marginTop: 2 }}
        />
        <span className={classes.attrName}>Enrolled</span>
        <span className={classes.mlAuto}>
          {course.enrolledStudents}/{course.capacity}
        </span>
      </div> */}

      <Button
        className={classes.button}
        // onClick={onEnroll}
        // color={
        //   currentUser && currentUser.role === enums.UserRoles.STUDENT
        //     ? "primary"
        //     : "disabled"
        // }
        // disabled={
        //   !(currentUser && currentUser.role === enums.UserRoles.STUDENT)
        // }
        color={"disabled"}
        onClick={() => {}}
        disabled={true}
        round
      >
        {strings.enroll[lang]}
      </Button>
    </div>
  );
}
