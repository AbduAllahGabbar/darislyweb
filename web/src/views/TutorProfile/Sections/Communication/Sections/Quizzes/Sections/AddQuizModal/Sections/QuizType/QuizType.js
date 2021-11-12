import { makeStyles } from "@material-ui/core/styles";
import documentIcon from "assets/images/document.png";
import mcqIcon from "assets/images/mcq.png";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./quizTypeStyle.js";
import strings from "constants/strings.js";
import Button from "components/CustomButtons/Button";
import enums from "enums/index.js";

const useStyles = makeStyles(styles);

export default function QuizType(props) {
  const classes = useStyles();
  const { mcqClickHandler, onClose } = props;

  const lang = useSelector((state) => state.lang);

  return (
    <div>
      <div className={classes.quizTypeContainer}>
        <div className={classes.header}>{strings.chooseQuizType[lang]}</div>
        <div className={classes.buttonsContainer}>
          <div onClick={mcqClickHandler} className={classes.quizTypeButton}>
            <img className={classes.quizTypeIcon} src={mcqIcon} />
            <div>{strings.quizTypes[enums.QuizTypes.MCQ][lang]}</div>
          </div>
          <div className={classes.quizTypeButtonDisabled}>
            <img className={classes.quizTypeIcon} src={documentIcon} />
            <div>{strings.quizTypes[enums.QuizTypes.DOCUMENT][lang]}</div>
          </div>
        </div>
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
      </div>
    </div>
  );
}

QuizType.propTypes = {
  mcqClickHandler: PropTypes.func,
  onClose: PropTypes.func,
};
