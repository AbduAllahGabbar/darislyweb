import Button from 'components/CustomButtons/Button.js';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import nextBackStepperStyle from './nextBackStepperStyle';
import strings from 'constants/strings';

const useStyles = makeStyles(nextBackStepperStyle);

export default function CourseBuilder(props) {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  return (
    <GridContainer justify='center'>
      <GridItem
        xs={12}
        sm={12}
        md={6}
        style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          disabled={props.disabled}
          className={classes.button}
          round
          color={props.disabled ? null : 'secondary'}
          onClick={props.handleBack}>
          {strings.back[lang]}
        </Button>
        <Button
          className={classes.button}
          round
          color='primary'
          onClick={props.handleNext}>
          {props.publish
            ? props.publish === 'edit'
              ? strings.update[lang]
              : strings.publish[lang]
            : strings.paginationNext[lang]}
        </Button>
      </GridItem>
    </GridContainer>
  );
}
