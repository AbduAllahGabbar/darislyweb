import {makeStyles} from '@material-ui/core';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import NextBackStepper from 'components/NextBackStepper/NextBackStepper';
import InputWithLabel from 'components/TextInputs/InputWithLabel/InputWithLabel';
import strings from 'constants/strings';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkValidity} from 'utils';
import {setPreliminaryInfo, getCourseData} from '../../store/actions';
import CourseBuilderPreliminaryInfoStyle from './CourseBuilderPreliminaryInfoStyle';
import api from 'services/api';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(CourseBuilderPreliminaryInfoStyle);

export default function CourseBuilderPreliminaryInfo(props) {
  const lang = useSelector((state) => state.lang);
  const classes = useStyles();
  const course = useSelector((state) => state.course);
  const user = useSelector((state) => state.auth);
  const educations = strings.educations.map((education) => education[lang]);
  const grades = strings.grades.map((grade) => grade[lang]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const subjectsData = (await api.getSubjects()).data;
        const subjects = {
          ar: subjectsData.map((subject) => subject.name.ar),
          en: subjectsData.map((subject) => subject.name.en),
          ids: subjectsData.map((subject) => subject.id),
        };
        setValues({
          ...values,
          subjects: subjects,
        });
        if (props.courseAction === 'edit' && !course.description) {
          const courseData = await dispatch(getCourseData(props.courseId));
          console.log(courseData);
          const subject = {
            value:
              courseData.subjectId !== null
                ? courseData.subjectId
                : strings.subject[lang],
            error: '',
          };
          const education = {
            value:
              courseData.education !== null
                ? courseData.education
                : strings.education[lang],
            error: '',
          };
          const grade = {
            value:
              courseData.grade !== null
                ? courseData.grade
                : strings.grade[lang],
            error: '',
          };
          const description = {
            value:
              courseData.description !== null ? courseData.description : '',
            validation: {
              required: true,
              minLength: 1,
              maxLength: 300,
            },
            valid: false,
            error: null,
          };
          setValues({
            ...values,
            subject,
            education,
            grade,
            description,
            subjects: subjects,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [values, setValues] = useState({
    subjects: {
      ar: [],
      en: [],
      ids: [],
    },
    subject: {
      value:
        course.subjectId !== null ? course.subjectId : strings.subject[lang],
      error: '',
    },
    educations: [],
    education: {
      value:
        course.education !== null ? course.education : strings.education[lang],
      error: '',
    },
    grades: [],
    grade: {
      value: course.grade !== null ? course.grade : strings.grade[lang],
      error: '',
    },
    description: {
      value: course.description !== null ? course.description : '',
      validation: {
        required: true,
        minLength: 1,
        maxLength: 300,
      },
      valid: false,
      error: null,
    },
  });

  const changeSubject = (value) => {
    let subject = {value: value, error: ''};
    console.log(values.subjects[lang][values.subjects.ids.indexOf(value)]);
    setValues({...values, subject: subject});
  };
  const changeEducation = (prop) => {
    let education = {value: prop, error: ''};
    setValues({...values, education: education});
  };
  const changeGrade = (prop) => {
    let grade = {value: prop, error: ''};
    setValues({...values, grade: grade});
  };
  const handleNext = (step) => {
    let isFormValid = true;
    let updatedValues = {description: values.description};
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = {...updatedValues[key]};
      let val = updatedElement.value;
      updatedElement.error = checkValidity(val, updatedElement.validation);
      updatedElement.valid = updatedElement.error === null;
      updatedValues = {...updatedValues, [key]: updatedElement};
      isFormValid = isFormValid && updatedElement.valid;
    });

    if (values.subject.value === strings.subject[lang]) {
      isFormValid = false;
      values.subject.error = strings.errors.required[lang];
    }

    if (values.education.value === strings.education[lang]) {
      isFormValid = false;
      values.education.error = strings.errors.required[lang];
    }

    if (values.grade.value === strings.grade[lang]) {
      isFormValid = false;
      values.grade.error = strings.errors.required[lang];
    }

    setValues({...values, ...updatedValues});

    if (isFormValid) {
      let preliminaryInfo = {
        subjectId: values.subject.value,
        education: values.education.value,
        grade: values.grade.value,
        description: values.description.value,
      };
      dispatch(setPreliminaryInfo(preliminaryInfo));
      props.handleNext(step);
    }
  };

  const handleChange = (prop) => (event) => {
    const updatedElement = {...values[prop]};
    updatedElement.value = event.target.value;
    setValues({...values, [prop]: updatedElement});
  };

  return (
    <div>
      {props.publish ? null : (
        <NextBackStepper
          handleNext={handleNext}
          handleBack={props.handleBack}
          disabled={true}
        />
      )}
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={9}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={12} style={{marginBottom: 40}}>
              {user.has_image ? (
                <img src={user.has_image} alt='...' className={classes.img} />
              ) : (
                <AccountCircleIcon className={classes.img} />
              )}
              {/* <img src={instructorImage} alt="..." className={classes.img} /> */}

              <div>
                <span className={classes.teacher}>{strings.teacher[lang]}</span>
                <br />
                <span className={classes.teacherName}>
                  {user.firstName + ' ' + user.lastName}
                </span>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={3} className={classes.centerDropdown}>
              <CustomDropdown
                noLiPadding
                navDropdown
                buttonText={
                  typeof values.subject.value === 'number'
                    ? values.subjects[lang][
                        values.subjects.ids.indexOf(values.subject.value)
                      ]
                    : strings.subject[lang]
                }
                onClick={changeSubject}
                values={values.subjects.ids}
                errorMessage={values.subject.error}
                buttonProps={{
                  disabled: props.courseAction === 'edit' ? true : false,
                  className:
                    props.courseAction === 'edit'
                      ? classes.disableButton
                      : classes.dropdownButton + ' ' + classes.dropdownLarge,
                }}
                dropdownList={values.subjects[lang]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3} className={classes.centerDropdown}>
              <CustomDropdown
                noLiPadding
                navDropdown
                buttonText={
                  typeof values.education.value === 'number'
                    ? educations[values.education.value]
                    : strings.education[lang]
                }
                errorMessage={values.education.error}
                onClick={changeEducation}
                values={Array.from(Array(educations.length).keys())}
                buttonProps={{
                  disabled: props.courseAction === 'edit' ? true : false,
                  className:
                    props.courseAction === 'edit'
                      ? classes.disableButton
                      : classes.dropdownButton + ' ' + classes.dropdownLarge,
                }}
                dropdownList={educations}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3} className={classes.centerDropdown}>
              <CustomDropdown
                noLiPadding
                navDropdown
                errorMessage={values.grade.error}
                buttonText={
                  typeof values.grade.value === 'number'
                    ? grades[values.grade.value]
                    : strings.grade[lang]
                }
                onClick={changeGrade}
                values={Array.from(Array(grades.length).keys())}
                buttonProps={{
                  disabled: props.courseAction === 'edit' ? true : false,
                  className:
                    props.courseAction === 'edit'
                      ? classes.disableButton
                      : classes.dropdownButton + ' ' + classes.dropdownLarge,
                }}
                dropdownList={grades}
              />
            </GridItem>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              value={values.description.value}
              valid={values.description.isValid}
              type='text'
              errorMessage={
                values.description.error && values.description.error[lang]
              }
              placeholder={strings.courseDescription[lang]}
              formControlStyle={classes.textAreaFormControl}
              inputStyle={classes.textArea}
              inputProps={{
                onChange: handleChange('description'),
                multiline: true,
                rows: 10,
              }}
            />
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
