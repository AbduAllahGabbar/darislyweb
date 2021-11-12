import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import QuizStudents from "./QuizStudents/QuizStudents.js";
import StudentAnswers from "./StudentAnswers/StudentAnswers.js";
import styles from "./viewQuizModalStyle.js";

const useStyles = makeStyles(styles);

export default function ViewQuizModal(props) {
  const classes = useStyles();
  const { isOpen, handleClose, quizId, setQuizId, questionsCount } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    active: 0,
  });

  const [questions, setQuestions] = useState(null);

  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setState({
      active: 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetState();
      }, 300);
    }
  }, [isOpen]);

  const handleView = async (studentId) => {
    try {
      setLoading(true);
      const response = (await api.getStudentQuizAnswer(quizId, studentId)).data;
      setQuestions(response);
      setState({ ...state, active: 1 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setState({ ...state, active: 3 });
    }
  };

  let modalcontent = <div />;

  if (state.active === 0) {
    modalcontent = (
      <QuizStudents
        isOpen={isOpen}
        quizId={quizId}
        handleView={handleView}
        questionsCount={questionsCount}
      />
    );
  } else if (state.active === 1) {
    modalcontent = (
      <StudentAnswers onClose={handleClose} questions={questions} />
    );
  } else if (state.active === 2) {
    modalcontent = (
      <div>
        <div className={classes.titleContainer}>
          <CheckCircle className={classes.checkCircleIcon} />
        </div>
        <div className={classes.message}>
          {strings.quizUpdatedSuccessfully[lang]}
        </div>
        <div className={classes.buttonsContainer}>
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={handleClose}
          >
            {strings.ok[lang]}
          </Button>
        </div>
      </div>
    );
  } else if (state.active === 3) {
    modalcontent = (
      <div>
        <div className={classes.titleContainer}>
          <CancelIcon className={classes.cancelIcon} />
        </div>
        <div className={classes.message}>{strings.somethingWrong[lang]}</div>
        <div className={classes.buttonsContainer}>
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={handleClose}
          >
            {strings.cancel[lang]}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CustomModal style={{ marginTop: 0 }} open={isOpen} onClose={handleClose}>
        <Loading style={{ height: 175 }} loading={loading}>
          <div className={"scrollbar " + classes.root}>{modalcontent}</div>
        </Loading>
      </CustomModal>
    </div>
  );
}
