import {makeStyles} from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import React, {useEffect, useState} from 'react';
import styles from './coursesStyle.js';
import {useSelector, useDispatch} from 'react-redux';
import strings from 'constants/strings';
import Button from 'components/CustomButtons/Button.js';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import {useHistory} from 'react-router';
import ErrorModal from 'components/ErrorModal/ErrorModal';
import Table from 'components/Table/Table.js';
import Loading from 'components/Loading/Loading';
import api from 'services/api';
import EditIcon from '@material-ui/icons/Edit';
import {resetCourse} from 'store/actions';

const useStyles = makeStyles(styles);

export default function Courses(props) {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  const history = useHistory();

  let coursesData = [];

  const currentUser = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          setLoading(true);
          const response = (await api.getTutorCourses(currentUser.id)).data;
          setCourses(response);
        }
      } catch (err) {
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createCourse = () => {
    history.push({
      pathname: '/coursebuilder',
      state: {courseAction: 'create'},
    });
    dispatch(resetCourse());
  };

  courses &&
    courses.length &&
    courses.forEach((course, index) => {
      coursesData.push([
        <span key={index}>{course.subject.name[lang]}</span>,
        <span key={index}>{strings.educations[course.education][lang]}</span>,
        <span key={index}>{strings.grades[course.grade][lang]}</span>,
        <span>
          <div
            onClick={() => {
              history.push({
                pathname: '/coursebuilder',
                state: {courseAction: 'edit', courseId: course.id},
              });
            }}
            className={classes.editContainer}>
            <EditIcon />
          </div>
        </span>,
      ]);
    });

  return (
    <GridContainer justify='center'>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={7} className={classes.background}>
            <GridContainer justify='center'>
              <ErrorModal
                open={showErrorModal}
                onClose={() => setShowErrorModal(false)}
              />
              <GridItem xs={12} sm={12} md={2} className={classes.gridItemEnd}>
                <LibraryBooksIcon className={classes.iconColor} />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={6}
                className={classes.gridItemStart}>
                <h3 className={classes.headerMargin}>
                  {strings.goToCourseCreation[lang]}
                </h3>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.gridItemStart}>
                <Button
                  round
                  className={classes.button}
                  color='primary'
                  onClick={createCourse}>
                  {strings.createYourCourse[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <GridContainer justify='center'>
          <GridItem
            xs={12}
            sm={12}
            md={10}
            className={classes.gridItem}
            style={{marginTop: 20}}>
            <Loading loading={loading}>
              <Table
                tableHead={[
                  strings.subject[lang],
                  strings.education[lang],
                  strings.grade[lang],
                  ' ',
                ]}
                tableData={coursesData}
                tableHeaderColor='secondary'
                round
                pagination
              />
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
