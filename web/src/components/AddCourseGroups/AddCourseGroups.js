import React, {useState, useEffect, useRef} from 'react';
import Button from 'components/CustomButtons/Button.js';
import AddCourseGroup from 'components/AddCourseGroup/AddCourseGroup';
import {makeStyles} from '@material-ui/core';
import AddCourseGroupsStyle from './AddCourseGroupsStyle';
import NextBackStepper from 'components/NextBackStepper/NextBackStepper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import {useSelector, useDispatch} from 'react-redux';
import strings from 'constants/strings';
import CustomModal from 'components/CustomModal/CustomModal.js';
import {editGroups} from '../../store/actions';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorModal from 'components/ErrorModal/ErrorModal.js';
import {createCourse, updateCourse} from 'store/actions/course';
import api from 'services/api';
import SuccessModal from 'components/SuccessModal/SuccessModal';
import {useHistory} from 'react-router';

const useStyles = makeStyles(AddCourseGroupsStyle);

export default function AddCourseGroups(props) {
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const history = useHistory();
  const course = useSelector((state) => state.course);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const groupsRedux = useSelector((state) => state.course.groups);
  const classes = useStyles();
  const ref = useRef(null);
  const [values, setValues] = useState({
    centers: {
      ar: [],
      en: [],
      ids: [],
    },
    deleteGroupModal: false,
    groupIndex: 0,
    errors: [],
    errorMessage: '',
    errorModal: false,
  });
  useEffect(() => {
    if (groupsRedux.length > 0) {
      groupsRedux.forEach((group, index) => {
        let errors = values.errors;
        let daysErrors = {};
        Object.keys(groupsRedux[index].weekDays).forEach((day, index) => {
          daysErrors = {...daysErrors, [day]: {from: '', to: ''}};
        });
        errors.push({
          type: '',
          centerId: '',
          startDate: '',
          endDate: '',
          weekDays: daysErrors,
          // capacity: "",
          daysSelected: '',
        });
        setValues({...values, errors: errors});
      });
    }
  }, []);

  useEffect(() => {
    if (groupsRedux.length > 1) {
      ref.current.scrollIntoView({behavior: 'smooth'});
    }
  }, []);

  const addDay = (day, index) => () => {
    let group = groupsRedux[index];
    let weekDays = group.weekDays;
    let errors = values.errors[index];
    let dayErrors = errors.weekDays;
    if (day in weekDays) {
      delete weekDays[day];
      delete dayErrors[day];
    } else {
      group.weekDays = {...weekDays, [day]: {from: '', to: ''}};
      errors.weekDays = {...dayErrors, [day]: {from: '', to: ''}};
    }
    let allErrors = values.errors;
    allErrors[index] = errors;
    setValues({...values, errors: allErrors});
    let groups = [...groupsRedux];
    groups[index] = group;
    dispatch(editGroups(groups));
  };

  const handleChange = (prop, index) => (event) => {
    let group = groupsRedux[index];
    group[prop] = event.target.value;
    let groups = [...groupsRedux];
    groups[index] = group;
    dispatch(editGroups(groups));
  };

  const handleTimeChange = (prop, day, index) => (event) => {
    let group = groupsRedux[index];
    let weekDays = group.weekDays;
    weekDays[day][prop] = event.target.value;
    group.weekDays = weekDays;
    let groups = [...groupsRedux];
    groups[index] = group;
    dispatch(editGroups(groups));
  };

  const handleClick = (prop, index) => (value) => {
    let group = groupsRedux[index];
    group[prop] = value;
    let groups = [...groupsRedux];
    groups[index] = group;
    dispatch(editGroups(groups));
  };

  const deleteGroup = (index) => () => {
    setValues({...values, groupIndex: index, deleteGroupModal: true});
  };

  const handleDeleteGroup = async () => {
    let groups = [...groupsRedux];
    groups.splice(values.groupIndex, 1);
    let errors = values.errors;
    errors.splice(values.groupIndex, 1);
    dispatch(editGroups(groups));
    setValues({
      ...values,
      deleteGroupModal: false,
      errors: errors,
      groupIndex: 0,
    });
  };

  const handlePublish = async (step) => {
    let errors = values.errors;
    let isFormValid = true;
    let errorMessage = '';
    if (groupsRedux.length === 0) {
      isFormValid = false;
      errorMessage = strings.errors.required[lang];
    }
    groupsRedux.forEach((group, index) => {
      let requiredError = strings.errors.required[lang];
      if (group.type === '') {
        isFormValid = false;
        errors[index].type = requiredError;
      }
      if ((group.type === 1 || group.type === 2) && group.centerId === '') {
        isFormValid = false;
        errors[index].centerId = requiredError;
      }
      if (group.startDate === '') {
        isFormValid = false;
        errors[index].startDate = requiredError;
      }
      if (group.endDate === '') {
        isFormValid = false;
        errors[index].endDate = requiredError;
      }
      if (
        group.endDate !== '' &&
        group.startDate !== '' &&
        group.startDate.toString() > group.endDate.toString()
      ) {
        isFormValid = false;
        errors[index].endDate = strings.errorDates[lang];
        errors[index].startDate = strings.errorDates[lang];
      }
      if (Object.keys(group.weekDays).length === 0) {
        isFormValid = false;
        errors[index].daysSelected = requiredError;
      }
      Object.keys(errors[index].weekDays).forEach((day, dayIndex) => {
        if (group.weekDays[day].from === '') {
          isFormValid = false;
          errors[index].weekDays[day].from = requiredError;
        }
        if (group.weekDays[day].to === '') {
          isFormValid = false;
          errors[index].weekDays[day].to = requiredError;
        }
        if (
          group.weekDays[day].to !== '' &&
          group.weekDays[day].from !== '' &&
          group.weekDays[day].to.toString() <
            group.weekDays[day].from.toString()
        ) {
          isFormValid = false;
          errors[index].weekDays[day].from = strings.errorTime[lang];
          errors[index].weekDays[day].to = strings.errorTime[lang];
        }
      });
    });
    setValues({...values, errors: errors, errorMessage: errorMessage});

    if (isFormValid) {
      let response;
      if (props.courseAction === 'edit') {
        console.log(course);
        response = await dispatch(updateCourse(course.id, course));
      } else {
        response = await dispatch(createCourse(course));
      }

      if (!response) setValues({...values, errorModal: true});
      else setShowSuccessModal(true);
    }
    // props.handleNext(step);
  };
  const courseCreated = () => {
    setShowSuccessModal(false);
    history.push({
      pathname: '/',
    });
  };
  const addGroup = () => {
    let groups = [...groupsRedux];
    groups.push({
      centerId: '',
      type: '',
      // capacity: "",
      weekDays: {},
      startDate: '',
      endDate: '',
    });
    let errors = values.errors;
    errors.push({
      type: '',
      centerId: '',
      startDate: '',
      endDate: '',
      // capacity: "",
      weekDays: {},
      daysSelected: '',
    });
    setValues({...values, errors: errors});
    dispatch(editGroups(groups));
  };

  return (
    <div>
      <SuccessModal
        open={showSuccessModal}
        onClose={courseCreated}
        message={
          props.courseAction === 'edit'
            ? strings.courseUpdatedSuccess[lang]
            : strings.courseAddedSuccess[lang]
        }
      />
      <CustomModal
        open={values.deleteGroupModal}
        onClose={() => setValues({...values, deleteGroupModal: false})}>
        <GridContainer justify='center' className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <p className={classes.label}>{strings.deleteGroupMessage[lang]}</p>
          </GridItem>
        </GridContainer>
        <GridContainer justify='center' className={classes.rowContainer}>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button
              onClick={() => setValues({...values, deleteGroupModal: false})}
              color='secondary'
              round>
              {strings.no[lang]}
            </Button>
          </GridItem>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button onClick={handleDeleteGroup} color='primary' round>
              {strings.yes[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </CustomModal>
      <ErrorModal
        open={values.errorModal}
        onClose={() => setValues({...values, errorModal: false})}
      />
      {props.publish ? null : (
        <NextBackStepper
          handleNext={handlePublish}
          handleBack={props.handleBack}
          publish={props.courseAction}
        />
      )}
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={9}>
          {groupsRedux.map((group, i) => {
            return (
              <div key={i}>
                <AddCourseGroup
                  ref={i == groupsRedux.length - 1 ? ref : null}
                  number={i}
                  group={group}
                  addDay={addDay}
                  handleChange={handleChange}
                  deleteGroup={deleteGroup}
                  handleClick={handleClick}
                  errors={values.errors}
                  handleTimeChange={handleTimeChange}
                  // capacity={values.capacity}
                />
              </div>
            );
          })}
          <div style={{textAlign: 'center'}}>
            <Button
              round
              className={classes.button}
              color='primary'
              onClick={addGroup}>
              {strings.addGroup[lang]}
            </Button>
            <FormHelperText
              id='component-error-text'
              className={classes.buttonError}>
              {values.errorMessage}
            </FormHelperText>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
