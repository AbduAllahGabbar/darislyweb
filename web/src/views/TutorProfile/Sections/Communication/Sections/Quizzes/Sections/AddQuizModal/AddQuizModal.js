import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings.js";
import enums from "enums/index.js";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import api from "services/api.js";
import styles from "./addQuizzModalStyle.js";
import AddQuestions from "./Sections/AddQuestions/AddQuestions.js";
import QuizDetails from "./Sections/QuizDetails/QuizDetails.js";
import QuizType from "./Sections/QuizType/QuizType.js";
import { generateRandomString } from "utils/index.js";

const useStyles = makeStyles(styles);

export default function AddQuizModal(props) {
  const classes = useStyles();
  const { isOpen, handleClose } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    active: 0,
  });
  const [quizType, setQuizType] = useState(null);
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: generateRandomString(),
      image: null,
      questionText: "",
      answers: [
        {
          answerText: "",
          error: null,
        },
      ],
      correctAnswerIndex: 0,
      error: null,
    },
  ]);

  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setState({
      active: 0,
    });
    setQuizType(null);
    setQuizDetails(null);
    setQuizQuestions([
      {
        id: generateRandomString(),
        questionText: "",
        answers: [
          {
            answerText: "",
            error: null,
          },
        ],
        correctAnswerIndex: 0,
        hasImage: 0,
        error: null,
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      resetState();
    }, 100);
  }, [isOpen]);

  const mcqClickHandler = () => {
    setState({ ...state, active: 1 });
    setQuizType(enums.QuizTypes.MCQ);
  };

  const proceedToQuestionsHandler = () => {
    setState({ ...state, active: 2 });
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      let questions = [];
      quizQuestions.forEach((question) => {
        console.log(question);
        questions.push({
          id: question.id,
          questionText: question.questionText,
          choices: question.answers.map((answer) => answer.answerText),
          correctAnswerIdx: question.correctAnswerIndex,
          hasImage: 0,
          image: question.image,
        });
      });
      const reqBody = {
        questions,
        type: quizType,
        from: quizDetails.from,
        to: quizDetails.to,
        duration: quizDetails.duration,
        name: quizDetails.name,
        showAnswers: quizDetails.showAnswers ? 1 : 0,
      };
      const response = await api.addQuiz(reqBody, quizDetails.lectureId);
      setState({ ...state, active: 3 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setState({ ...state, active: 4 });
    }
  };

  let modalcontent = <div />;

  if (state.active === 0) {
    modalcontent = (
      <QuizType mcqClickHandler={mcqClickHandler} onClose={handleClose} />
    );
  } else if (state.active === 1) {
    modalcontent = (
      <QuizDetails
        onClose={handleClose}
        proceedToQuestionsHandler={proceedToQuestionsHandler}
        parentQuizDetails={quizDetails}
        setParentQuizDetails={setQuizDetails}
        quizType={quizType}
      />
    );
  } else if (state.active === 2) {
    modalcontent = (
      <AddQuestions
        onClose={handleClose}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        submitHandler={submitHandler}
      />
    );
  } else if (state.active === 3) {
    modalcontent = (
      <div>
        <div className={classes.titleContainer}>
          <CheckCircle className={classes.checkCircleIcon} />
        </div>
        <div className={classes.message}>
          {strings.quizSubmittedSuccessfully[lang]}
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
  } else if (state.active === 4) {
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
          <div className={classes.root}>{modalcontent}</div>
        </Loading>
      </CustomModal>
    </div>
  );
}

AddQuizModal.propTypes = {
  active: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
