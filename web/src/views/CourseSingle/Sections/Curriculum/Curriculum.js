import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import styles from "./curriculumStyle.js";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { translateNumber } from "utils/index.js";
import { useSelector } from "react-redux";
import strings from "constants/strings.js";
import Loading from "components/Loading/Loading.js";

const useStyles = makeStyles(styles);

export default function Curriculum(props) {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);

  const sections = props.course?.sections;

  console.log("sections");
  console.log(sections);

  let sectionItems = [];
  let lectureItems = [];
  if (sections) {
    sections.forEach((section, index) => {
      lectureItems = [];
      section.lectures.forEach((lecture, index) => {
        lectureItems.push(
          <div key={index} className={classes.lectureItem}>
            <LibraryBooksIcon className={classes.lectureIcon} />
            <span className={classes.lectureName}>{lecture.title}</span>
            <span className={classes.lecturePrice}>
              <span>
                {translateNumber(
                  Number(
                    Number(lecture.price * (1 + props.course?.taxPercentage / 100)) +
                      Number(props.course?.serviceFees)
                  )
                    .toFixed(2)
                    .toString(),
                  lang
                )}
              </span>
              &nbsp;
              <span>{strings.egp[lang]}</span>
            </span>
          </div>
        );
      });
      sectionItems.push(
        <div key={index}>
          <h2 className={classes.sectionName}>{section.title}</h2>
          <div className={classes.lectureList}>{lectureItems}</div>
        </div>
      );
    });
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={10} md={10} className={classes.root}>
        <Loading loading={sections ? false : true}>{sectionItems}</Loading>
      </GridItem>
    </GridContainer>
  );
}
