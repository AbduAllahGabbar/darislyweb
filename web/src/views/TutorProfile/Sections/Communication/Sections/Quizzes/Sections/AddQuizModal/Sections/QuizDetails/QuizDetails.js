import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SelectInput from "components/SelectInput/SelectInput";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import Switch from "@material-ui/core/Switch";
import strings from "constants/strings.js";
import enums from "enums/index.js";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Datetime from "react-datetime";
import { useSelector } from "react-redux";
import api from "services/api";
import { checkValidity, formatAMPM, translateNumber } from "utils/index.js";
import styles from "./quizDetailsStyle.js";

const useStyles = makeStyles(styles);

export default function QuizDetails(props) {
  const classes = useStyles();
  const {
    onClose,
    proceedToQuestionsHandler,
    setParentQuizDetails,
    parentQuizDetails,
    quizType,
  } = props;
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizDetails, setQuizDetails] = useState({
    name: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },
    courseId: {
      value: 0,
      validation: {
        required: true,
      },
      valid: false,
      error: null,
    },
    lectureId: {
      value: 0,
      validation: {
        required: true,
      },
      valid: false,
      error: null,
    },
    duration: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      error: null,
    },
    datetime: {
      start: {
        value: null,
        open: false,
        error: null,
        valid: false,
      },
      end: {
        value: null,
        open: false,
        error: null,
        valid: false,
      },
    },
    showAnswers: true,
  });

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  moment.updateLocale("en", {
    months: strings.months[lang],
    weekdaysMin: strings.shortDays[lang],
  });

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          const response = (await api.getTutorCourses(currentUser.id)).data;
          setCourses(response);
        }
      } catch (err) {}
    })();
  }, []);

  const handleChange = (prop) => (event) => {
    let updatedElement = { ...quizDetails[prop] };
    if (prop === "duration") {
      var numberReg = new RegExp("[^0-9٠-٩]");
      if (!numberReg.test(event.target.value)) {
        if (event.target.value === "") {
          updatedElement.value = "";
        } else {
          updatedElement.value = translateNumber(event.target.value, "en");
        }
      } else {
        updatedElement.value = "";
      }
    } else if (prop === "showAnswers") {
      updatedElement = event.target.checked;
    } else {
      updatedElement.value = event.target.value;
    }
    setQuizDetails({ ...quizDetails, [prop]: updatedElement });
  };

  const handleDateChange = (prop, value) => {
    let datetime = { ...quizDetails.datetime };
    datetime[prop].value = value;
    setQuizDetails({ ...quizDetails, datetime });
  };

  const pickerClickHandler = (prop) => {
    let datetime = { ...quizDetails.datetime };
    datetime[prop].open = true;
    setQuizDetails({ ...quizDetails, datetime });
  };

  const handleDatetimeClose = (prop) => {
    let datetime = { ...quizDetails.datetime };
    datetime[prop].open = false;
    setQuizDetails({ ...quizDetails, datetime });
  };

  const handleSelectCourse = async (event) => {
    let courseId = quizDetails.courseId;
    let lectureId = quizDetails.lectureId;
    lectureId.value = 0;
    courseId.value = event.target.value;
    setQuizDetails({ ...quizDetails, courseId, lectureId });
    try {
      const response = (await api.getCourseLectures(event.target.value)).data;
      let lectureArray = [];
      if (response?.length > 0) {
        response.forEach((section, index) => {
          section.lectures.forEach((lecture, index) => {
            lectureArray.push(lecture);
          });
        });
      }
      setLectures(lectureArray);
    } catch (err) {}
  };

  const handleSelectLecture = async (event) => {
    let lectureId = quizDetails.lectureId;
    lectureId.value = event.target.value;
    setQuizDetails({ ...quizDetails, lectureId });
  };

  let datetimePickersElements = [];
  Object.keys(quizDetails.datetime).forEach((key) => {
    console.log(key);
    console.log(quizDetails.datetime);
    datetimePickersElements.push(
      <GridContainer
        justify="center"
        className={classes.rowContainer}
        key={key}
      >
        <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
          <div className={classes.label}>
            {key === "start"
              ? strings.startingAt[lang]
              : strings.endingAt[lang]}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
          <div className={classes.datetimeContainer}>
            <ClickAwayListener onClickAway={() => handleDatetimeClose(key)}>
              <FormControl className={classes.datetime} fullWidth>
                <Datetime
                  renderMonth={(props, month) => (
                    <td {...props}>{(month + 1).toString()}</td>
                  )}
                  inputProps={{
                    placeholder: strings.selectDateAndTime[lang],
                  }}
                  value={quizDetails.datetime[key].value}
                  onChange={(value) => handleDateChange(key, value)}
                  // input={false}
                  open={quizDetails.datetime[key].open}
                  closeOnClickOutside={true}
                />
                <div
                  onClick={() => pickerClickHandler(key)}
                  className={classes.datetimePickerValue}
                >
                  {quizDetails.datetime[key].value
                    ? translateNumber(
                        quizDetails.datetime[key].value.toDate().getDate() +
                          "/" +
                          (quizDetails.datetime[key].value.toDate().getMonth() +
                            1) +
                          "/" +
                          quizDetails.datetime[key].value
                            .toDate()
                            .getFullYear(),
                        lang,
                        true
                      ) +
                      " - " +
                      formatAMPM(
                        quizDetails.datetime[key].value.toDate().getHours() +
                          ":" +
                          quizDetails.datetime[key].value.toDate().getMinutes(),
                        lang
                      )
                    : ""}
                </div>
                <FormHelperText
                  id="component-error-text"
                  className={classes.labelRootError}
                >
                  {quizDetails.datetime[key].error &&
                    quizDetails.datetime[key].error[lang]}
                </FormHelperText>
              </FormControl>
            </ClickAwayListener>
          </div>
        </GridItem>
      </GridContainer>
    );
  });

  const nextHandler = () => {
    let isFormValid = true;
    let updatedQuizDetails = { ...quizDetails };
    Object.keys(updatedQuizDetails).forEach((key) => {
      if (key === "name" || key === "duration") {
        const updatedElement = { ...updatedQuizDetails[key] };
        updatedElement.error = checkValidity(
          updatedElement.value,
          updatedElement.validation
        );
        updatedElement.valid = updatedElement.error === null;
        updatedQuizDetails = { ...updatedQuizDetails, [key]: updatedElement };
        isFormValid = isFormValid && updatedElement.valid;
      } else if (key === "courseId" || key === "lectureId") {
        const updatedElement = { ...updatedQuizDetails[key] };
        updatedElement.error =
          updatedElement.value === 0 ? strings.errors.required : null;
        updatedElement.valid = updatedElement.error === null;
        updatedQuizDetails = { ...updatedQuizDetails, [key]: updatedElement };
        isFormValid = isFormValid && updatedElement.valid;
      } else if (key === "datetime") {
        let updatedElement = { ...updatedQuizDetails[key] };
        Object.keys(updatedElement).forEach((key) => {
          let updatedDatetime = updatedElement[key];
          updatedDatetime.error =
            updatedDatetime.value === null ? strings.errors.required : null;
          updatedDatetime.valid = updatedDatetime.error === null;
          isFormValid = isFormValid && updatedDatetime.valid;
          updatedElement = { ...updatedElement, [key]: updatedDatetime };
        });
        updatedQuizDetails = { ...updatedQuizDetails, [key]: updatedElement };
      }
    });
    setQuizDetails(updatedQuizDetails);

    if (isFormValid) {
      setParentQuizDetails({
        name: quizDetails.name.value,
        lectureId: quizDetails.lectureId.value,
        from: quizDetails.datetime.start.value.toISOString(),
        to: quizDetails.datetime.end.value.toISOString(),
        duration: quizDetails.duration.value,
        showAnswers: quizDetails.showAnswers,
      });
      if (quizType === enums.QuizTypes.MCQ) {
        proceedToQuestionsHandler();
      }
    }
  };

  let tutorCourses = [];
  if (courses) {
    courses.forEach((course) => {
      tutorCourses.push({
        value: course.id,
        name: `${course.subject.name[lang]} - ${
          strings.educations[course.education][lang]
        } - ${lang === "en" ? "Grade " : ""}${
          strings.grades[course.grade][lang]
        }`,
      });
    });
  }
  let courseLectures = [];
  if (lectures) {
    lectures.forEach((lecture) => {
      courseLectures.push({
        value: lecture.id,
        name: lecture.title,
      });
    });
  }

  return (
    <div>
      <div className={classes.quizDetailsContainer}>
        <div className={classes.header}>{strings.addQuizDetails[lang]}</div>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
            <div className={classes.label}>{strings.name[lang]}</div>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
              }}
              placeholder={strings.name[lang]}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={quizDetails.name.value}
              inputProps={{
                onChange: handleChange("name"),
              }}
              errorMessage={
                quizDetails.name.error && quizDetails.name.error[lang]
              }
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
            <div className={classes.label}>{strings.chooseCourse[lang]}</div>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <SelectInput
              selectStyle={classes.select}
              id={0}
              placeholder={strings.chooseCourse[lang]}
              data={tutorCourses}
              value={quizDetails.courseId.value}
              onSelect={handleSelectCourse}
              errorMessage={
                quizDetails.courseId.error && quizDetails.courseId.error[lang]
              }
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
            <div className={classes.label}>{strings.untilLecture[lang]}</div>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <SelectInput
              selectStyle={classes.select}
              id={1}
              placeholder={strings.chooseLecture[lang]}
              data={courseLectures}
              value={quizDetails.lectureId.value}
              onSelect={handleSelectLecture}
              errorMessage={
                quizDetails.lectureId.error && quizDetails.lectureId.error[lang]
              }
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
            <div className={classes.label}>
              {strings.durationInMinutes[lang]}
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
              }}
              // type="number"
              placeholder={strings.duration[lang]}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={
                quizDetails.duration.value === ""
                  ? ""
                  : translateNumber(quizDetails.duration.value, lang)
              }
              inputProps={{
                onChange: handleChange("duration"),
              }}
              valid={quizDetails.duration.isValid}
              errorMessage={
                quizDetails.duration.error && quizDetails.duration.error[lang]
              }
            />
          </GridItem>
        </GridContainer>
        {datetimePickersElements}
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={4} className={classes.gridItem}>
            <div className={classes.label}>{strings.showAnswers[lang]}</div>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={8}
            className={classes.gridItem + " " + classes.switchContainer}
          >
            <Switch
              checked={quizDetails.showAnswers}
              // onChange={(event) => setShowAnswersChecked(event.target.checked)}
              onChange={handleChange("showAnswers")}
              classes={{
                switchBase: classes.switchBase,
                checked: classes.switchChecked,
                thumb: classes.switchIcon,
                track: classes.switchBar,
              }}
              name="checkedShowAnswers"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          round
          color="secondary"
          className={classes.modalButton}
          onClick={onClose}
        >
          {strings.cancel[lang]}
        </Button>
        <Button
          round
          color="primary"
          className={classes.modalButton}
          onClick={nextHandler}
        >
          {strings.nextButton[lang]}
        </Button>
      </div>
    </div>
  );
}

QuizDetails.propTypes = {
  onClose: PropTypes.func,
};
