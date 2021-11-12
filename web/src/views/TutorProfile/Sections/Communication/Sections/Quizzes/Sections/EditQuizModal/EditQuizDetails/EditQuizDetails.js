import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import Switch from "@material-ui/core/Switch";
import strings from "constants/strings.js";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Datetime from "react-datetime";
import { useSelector } from "react-redux";
import { checkValidity, formatAMPM, translateNumber } from "utils/index.js";
import styles from "./editQuizDetailsStyle.js";

const useStyles = makeStyles(styles);

export default function EditQuizDetails(props) {
  const classes = useStyles();
  const {
    onClose,
    proceedToQuestionsHandler,
    setQuizDetails,
    quizDetails,
  } = props;

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  moment.updateLocale("en", {
    months: strings.months[lang],
    weekdaysMin: strings.shortDays[lang],
  });

  useEffect(() => {
    (async () => {
      try {
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

  let datetimePickersElements = [];
  if (quizDetails.datetime.start.value) {
    Object.keys(quizDetails.datetime).forEach((key) => {
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
                            (quizDetails.datetime[key].value
                              .toDate()
                              .getMonth() +
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
                            quizDetails.datetime[key].value
                              .toDate()
                              .getMinutes(),
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
  }

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
      proceedToQuestionsHandler();
    }
  };

  return (
    <div>
      <div className={classes.quizDetailsContainer}>
        <div className={classes.header}>{strings.editQuizDetails[lang]}</div>
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

EditQuizDetails.propTypes = {
  onClose: PropTypes.func,
};
