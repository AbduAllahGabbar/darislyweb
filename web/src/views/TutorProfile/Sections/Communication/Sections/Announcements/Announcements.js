import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SelectInput from "components/SelectInput/SelectInput";
import SuccessModal from "components/SuccessModal/SuccessModal";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { checkValidity } from "utils";
import styles from "./announcementsStyle.js";
import settingsStyle from "views/StudentProfile/Sections/Settings/settingsStyle.js";
import Loading from "components/Loading/Loading.js";

const useStyles = makeStyles(styles);

export default function Announcements(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [values, setValues] = useState({
    message: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 500,
      },
      valid: false,
      error: null,
    },
  });
  const [courseSelect, setCourseSelect] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setValues({
      message: {
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 500,
        },
        valid: false,
        error: null,
      },
    });
    setCourseSelect(0);
  };

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

  const handleSelectCourse = async (event) => {
    setCourseSelect(event.target.value);
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

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };
  const handleSubmit = async () => {
    let isFormValid = true;
    let updatedValues = { ...values };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;
      updatedElement.error = checkValidity(val, updatedElement.validation);
      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    isFormValid = isFormValid && courseSelect;
    setValues(updatedValues);
    if (isFormValid) {
      setLoading(true);
      try {
        await api.createAnnouncement(
          courseSelect,
          `${currentUser.firstName} ${currentUser.lastName}`,
          values.message.value
        );
        setShowSuccessModal(true);
        resetState();
      } catch (err) {
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={strings.announcementSentSuccess[lang]}
        />
        <GridContainer justify="center" className={classes.selectRow}>
          <GridItem xs={12} sm={8} md={6} className={classes.gridItem}>
            <p className={classes.label}>{strings.chooseCourse[lang]}</p>
            <SelectInput
              selectStyle={classes.select}
              placeholder={strings.selectCourse[lang]}
              data={tutorCourses}
              value={courseSelect}
              onSelect={handleSelectCourse}
            />
            <p className={classes.label + " " + classes.marginTop}>
              {strings.messageForCourseStudents[lang]}
            </p>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              formControlStyle={classes.formControl}
              inputStyle={classes.input}
              value={values.message.value}
              valid={values.message.isValid}
              errorMessage={values.message.error && values.message.error[lang]}
              inputProps={{
                onChange: handleChange("message"),
                multiline: true,
                rows: 7,
              }}
            />
            <Loading loading={loading} style={{ height: "unset" }}>
              <Button
                round
                color="secondary"
                className={classes.button}
                onClick={handleSubmit}
              >
                {strings.send[lang]}
              </Button>
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
