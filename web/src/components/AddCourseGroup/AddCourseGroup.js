import {makeStyles, TextField, withStyles} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  secondaryColor,
} from 'assets/jss/material-kit-pro-react';
import Button from 'components/CustomButtons/Button.js';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import strings from 'constants/strings';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AddCourseGroupStyle from './AddCourseGroupStyle';
import api from 'services/api';

const useStyles = makeStyles(AddCourseGroupStyle);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: secondaryColor[0],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: secondaryColor[0],
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: secondaryColor[0],
      },
      '&:hover fieldset': {
        borderColor: secondaryColor[0],
      },
      '&.Mui-focused fieldset': {
        borderColor: secondaryColor[0],
      },
    },
  },
})(TextField);

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  const types = strings.types.map((type) => type[lang]);

  const [values, setValues] = useState({
    centers: {
      ar: [],
      en: [],
      ids: [],
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const centersData = (await api.getCenters()).data;
        const centers = {
          ar: centersData.map((center) => center.name.ar),
          en: centersData.map((center) => center.name.en),
          ids: centersData.map((center) => center.id),
        };
        setValues({...values, centers: centers});
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  let daysArray = [];
  // {strings.daysOfTheWeek.map((day, index) => (
  Object.keys(strings.daysOfTheWeek).forEach((day, index) => {
    daysArray.push([
      <Button
        key={index}
        className={
          props.group.id
            ? day in props.group.weekDays
              ? classes.buttonSelected + ' ' + classes.buttonSelectedDisabled
              : classes.button + ' ' + classes.buttonDisabled
            : day in props.group.weekDays
            ? classes.buttonSelected
            : classes.button
        }
        round
        disabled={props.group.id ? true : false}
        color={day in props.group.weekDays ? 'secondary' : 'transparent'}
        onClick={props.addDay(day, props.number)}>
        {strings.daysOfTheWeek[day][lang]}
      </Button>,
    ]);
  });
  // )}
  let fromTo = [];
  Object.keys(props.group.weekDays).forEach((day, index) => {
    fromTo.push([
      <div key={index}>
        <GridContainer justify='center'>
          <GridItem
            xs={12}
            sm={12}
            md={1}
            className={classes.centerDay + ' ' + classes.paddingFromTo}>
            {strings.daysOfTheWeek[day][lang]}
          </GridItem>
          <GridItem xs={12} sm={12} md={2} className={classes.paddingFromTo}>
            <CssTextField
              error={
                props.errors[props.number]
                  ? props.errors[props.number].weekDays[day].from !== ''
                  : false
              }
              helperText={
                props.errors[props.number]
                  ? props.errors[props.number].weekDays[day].from
                  : ''
              }
              label={strings.from[lang]}
              disabled={props.group.id ? true : false}
              type='time'
              variant='outlined'
              color='secondary'
              value={props.group.weekDays[day].from}
              onChange={props.handleTimeChange('from', day, props.number)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />{' '}
          </GridItem>
          <GridItem xs={12} sm={12} md={2} className={classes.paddingFromTo}>
            <CssTextField
              error={
                props.errors[props.number]
                  ? props.errors[props.number].weekDays[day].to !== ''
                  : false
              }
              helperText={
                props.errors[props.number]
                  ? props.errors[props.number].weekDays[day].to
                  : ''
              }
              label={strings.to[lang]}
              variant='outlined'
              color='secondary'
              type='time'
              disabled={props.group.id ? true : false}
              value={props.group.weekDays[day].to}
              onChange={props.handleTimeChange('to', day, props.number)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </div>,
    ]);
  });
  // );
  return (
    <div className={classes.root} ref={ref}>
      <GridContainer justify='center'>
        <GridItem
          xs={12}
          sm={12}
          md={3}
          className={classes.centerDropdown + ' ' + classes.errorLabel}>
          <CustomDropdown
            noLiPadding
            navDropdown
            errorMessage={
              props.errors[props.number] ? props.errors[props.number].type : ''
            }
            buttonText={
              props.group.type === ''
                ? strings.chooseType[lang]
                : types[props.group.type]
            }
            onClick={props.handleClick('type', props.number)}
            values={Array.from(Array(types.length).keys())}
            className={classes.errorLabel}
            buttonProps={{
              disabled: props.group.id ? true : false,
              className: props.group.id
                ? classes.disableButton
                : classes.dropdownButton + ' ' + classes.dropdownLarge,
            }}
            dropdownList={types}
          />
        </GridItem>
        {props.group.type === 2 || props.group.type === 1 ? (
          <GridItem
            xs={12}
            sm={12}
            md={3}
            className={classes.centerDropdown + ' ' + classes.errorLabel}>
            <CustomDropdown
              noLiPadding
              navDropdown
              buttonText={
                typeof props.group.centerId === 'number'
                  ? values.centers[lang][
                      values.centers.ids.indexOf(props.group.centerId)
                    ]
                  : strings.center[lang]
              }
              dropdownList={values.centers[lang]}
              values={values.centers.ids}
              errorMessage={
                props.errors[props.number]
                  ? props.errors[props.number].centerId
                  : ''
              }
              onClick={props.handleClick('centerId', props.number)}
              buttonProps={{
                disabled: props.group.id ? true : false,
                className: props.group.id
                  ? classes.disableButton
                  : classes.dropdownButton + ' ' + classes.dropdownLarge,
              }}
            />
          </GridItem>
        ) : null}
        {/* <GridItem xs={12} sm={12} md={3} className={classes.centerDropdown}>
          <InputWithLabel
            formControlProps={{
              fullWidth: true,
              className: classes.customFormControlClasses,
            }}
            value={props.group.capacity}
            valid={props.errors[props.number] ? props.errors[props.number].capacity !== "" : true}
            errorMessage={
              props.errors[props.number] ? props.errors[props.number].capacity : ""
            }
            placeholder={strings.capacity[lang]}
            formControlStyle={classes.formControl}
            inputStyle={classes.input}
            type={"number"}
            inputProps={{
              onChange: props.handleChange("capacity", props.number),
            }}
          />
        </GridItem> */}
      </GridContainer>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={12} className={classes.days}>
          {strings.days[lang]}
        </GridItem>
      </GridContainer>
      <div style={{alignItems: 'center'}}>
        {daysArray}
        <FormHelperText
          id='component-error-text'
          className={classes.buttonError}>
          {props.errors[props.number]
            ? props.errors[props.number].daysSelected
            : ''}
        </FormHelperText>
      </div>
      <div style={{textAlign: 'center', marginTop: 30}}>{fromTo}</div>
      <GridContainer justify='center'>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            color: secondaryColor[0],
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 30,
            marginTop: 10,
          }}>
          Course Date
        </GridItem>
      </GridContainer>
      <GridContainer justify='center'>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}>
          <CssTextField
            error={
              props.errors[props.number]
                ? props.errors[props.number].startDate !== ''
                : false
            }
            helperText={
              props.errors[props.number]
                ? props.errors[props.number].startDate
                : ''
            }
            label={strings.startDate[lang]}
            type='date'
            variant='outlined'
            color='secondary'
            disabled={props.group.id ? true : false}
            value={props.group.startDate}
            className={classes.textField}
            onChange={props.handleChange('startDate', props.number)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </GridItem>
      </GridContainer>
      <GridContainer justify='center'>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            textAlign: 'center',
          }}>
          <CssTextField
            error={
              props.errors[props.number]
                ? props.errors[props.number].endDate !== ''
                : false
            }
            helperText={
              props.errors[props.number]
                ? props.errors[props.number].endDate
                : ''
            }
            label={strings.endDate[lang]}
            type='date'
            color='secondary'
            variant='outlined'
            disabled={props.group.id ? true : false}
            value={props.group.endDate}
            className={classes.textField}
            onChange={props.handleChange('endDate', props.number)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </GridItem>
      </GridContainer>
      {props.group.id ? null : (
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={12} className={classes.deleteGroup}>
            <Button
              onClick={props.deleteGroup(props.number)}
              color='danger'
              round
              className={classes.deleteGroup}>
              <DeleteIcon className={classes.deleteIcon} />
              {strings.deleteGroup[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
});
