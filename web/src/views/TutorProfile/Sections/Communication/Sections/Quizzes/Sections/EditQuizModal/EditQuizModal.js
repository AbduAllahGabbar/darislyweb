import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import AddQuestions from "../AddQuizModal/Sections/AddQuestions/AddQuestions.js";
import EditQuizDetails from "./EditQuizDetails/EditQuizDetails.js";
import styles from "./editQuizModalStyle.js";

const useStyles = makeStyles(styles);

export default function EditQuizModal(props) {
  const classes = useStyles();
  const { isOpen, handleClose, quizId, setQuizId } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    active: 0,
  });

  const [quizDetails, setQuizDetails] = useState({
    name: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      valid: false,
      error: null,
    },
    duration: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      error: null,
    },
    datetime: {
      start: {
        value: null,
        open: false,
        error: null,
        valid: false,
      },
      end: {
        value: null,
        open: false,
        error: null,
        valid: false,
      },
    },
  });
  const [quizQuestions, setQuizQuestions] = useState(null);

  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setState({
      active: 0,
    });
    setQuizQuestions(null);
    setQuizDetails({
      name: {
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 50,
        },
        valid: false,
        error: null,
      },
      duration: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        error: null,
      },
      datetime: {
        start: {
          value: null,
          open: false,
          error: null,
          valid: false,
        },
        end: {
          value: null,
          open: false,
          error: null,
          valid: false,
        },
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetState();
      }, 300);
    } else {
      (async () => {
        try {
          setLoading(true);
          const response = (await api.getQuiz(quizId)).data;
          const restructuredQuestions = response.questions.map(
            (question, index) => {
              let answers = question.choices.map((answer) => {
                return {
                  answerText: answer,
                  error: null,
                };
              });
              return {
                id: question.id,
                questionText: question.questionText,
                hasImage: question.hasImage,
                image: question.image,
                answers,
                error: null,
                correctAnswerIndex: question.correctAnswerIdx,
              };
            }
          );
          setQuizDetails({
            name: {
              value: response.name,
              validation: {
                required: true,
                minLength: 1,
                maxLength: 50,
              },
              valid: true,
              error: null,
            },
            duration: {
              value: response.duration.toString(),
              validation: {
                required: true,
              },
              valid: true,
              error: null,
            },
            datetime: {
              start: {
                value: moment(response.from),
                open: false,
                error: null,
                valid: true,
              },
              end: {
                value: moment(response.to),
                open: false,
                error: null,
                valid: true,
              },
            },
            showAnswers: response.showAnswers ? true : false,
          });
          setQuizQuestions(restructuredQuestions);
          setLoading(false);
        } catch (err) {
          setState({ ...state, active: 3 });
          setLoading(false);
        }
      })();
    }
  }, [isOpen]);

  const submitHandler = async () => {
    try {
      setLoading(true);
      let questions = [];
      quizQuestions.forEach((question) => {
        questions.push({
          id: question.id,
          questionText: question.questionText,
          choices: question.answers.map((answer) => answer.answerText),
          correctAnswerIdx: question.correctAnswerIndex,
          hasImage: question.hasImage,
          image: question.image,
        });
      });
      console.log(questions);
      const response = await api.updateQuiz(quizId, {
        questions,
        name: quizDetails.name.value,
        from: quizDetails.datetime.start.value.toISOString(),
        to: quizDetails.datetime.end.value.toISOString(),
        duration: quizDetails.duration.value,
        showAnswers: quizDetails.showAnswers ? 1 : 0,
      });
      setState({ ...state, active: 2 });
      setQuizId(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setState({ ...state, active: 3 });
    }
  };

  let modalcontent = <div />;

  if (state.active === 0) {
    modalcontent = (
      <EditQuizDetails
        onClose={handleClose}
        quizDetails={quizDetails}
        setQuizDetails={setQuizDetails}
        proceedToQuestionsHandler={() => setState({ ...state, active: 1 })}
      />
    );
  } else if (state.active === 1) {
    modalcontent = (
      <AddQuestions
        onClose={handleClose}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        submitHandler={submitHandler}
        hanldeBack={() => setState({ ...state, active: 0 })}
        edit
      />
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
          <div className={classes.root}>{modalcontent}</div>
        </Loading>
      </CustomModal>
    </div>
  );
}
