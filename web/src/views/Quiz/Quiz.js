import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import strings from "constants/strings";
import React, { useEffect, useState, useRef } from "react";
import Timer from "react-compound-timer";
import MathJax from "react-mathjax2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import api from "services/api";
import quizStyles from "./quizStyle";
import StudentAnswersModal from "../StudentProfile/Sections/Courses/Quizzes/StudentAnswersModal/StudentAnswersModal";
import SuccessModal from "components/SuccessModal/SuccessModal";
import { translateNumber } from "utils";

const useStyles = makeStyles(quizStyles);

export default function Quiz() {
  const history = useHistory();
  const classes = useStyles();
  let location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [quizGrade, setQuizGrade] = useState(null);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [quizError, setQuizError] = useState(null);
  const [quizRemainingTime, setQuizRemainingTime] = useState(0);

  const quizAnswersRef = useRef(quizAnswers);
  quizAnswersRef.current = quizAnswers;

  const lang = useSelector((state) => state.lang);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    history.push({
      pathname: "/",
    });
  };

  const handleCloseSuccessModal = () => {
    setQuizSuccess(false);
    history.push({
      pathname: "/",
    });
  };

  const canTakeQuiz = (quiz, remainingTime) => {
    let quizStart = new Date(quiz.from);
    if (quiz.submitted) {
      setQuizError(strings.quizAlreadySubmitted[lang]);
      return false;
    } else if (quizStart > new Date()) {
      setQuizError(strings.quizNotStarted[lang]);
      return false;
    } else if (remainingTime < 0) {
      setQuizError(strings.quizTimeOver[lang]);
      return false;
    } else if (!quiz.canSubmit) {
      setQuizError(strings.quizNotAvailable[lang]);
      return false;
    }
    return true;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.quizId) {
      try {
        (async () => {
          const quiz = (await api.getQuiz(location.state.quizId)).data;
          setQuizData(quiz);
          let now = new Date();
          let endTime = quiz.viewedTime
            ? new Date(quiz.viewedTime)
            : new Date();
          endTime.setMinutes(endTime.getMinutes() + quiz.duration);
          let remainingTime = endTime - now;
          setQuizRemainingTime(remainingTime);
          if (!canTakeQuiz(quiz, remainingTime)) {
            setShowErrorModal(true);
            return;
          }
          const questions = (await api.getQuizQuestions(location.state.quizId))
            .data.questions;
          setQuizQuestions(questions);
          setQuizAnswers(Array(questions.length).fill(-1));
          setTimeout(() => {
            submitQuiz();
          }, remainingTime);
          setLoading(false);
        })();
      } catch (err) {
        setShowErrorModal(true);
      }
    } else {
      setQuizError(strings.navigateToQuiz[lang]);
      setShowErrorModal(true);
    }
  }, []);

  const handleChooseAnswer = (event, questionIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = parseInt(event.target.value);
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    try {
      let quizId = location.state.quizId;
      setLoading(true);
      const answerBody = {
        answers: quizAnswersRef.current,
      };
      const quizResult = (await api.answerQuiz(answerBody, quizId)).data;
      setQuizGrade(
        `${strings.yourGrade[lang]}: ${quizResult.correctCount} / ${quizResult.totalCount}`
      );
      setQuizSuccess(true);
    } catch (err) {
      setQuizSuccess(false);
      setShowErrorModal(true);
    }
  };

  const getChoices = (question, questionIndex) => (
    <div>
      {question.choices.map((choice, choiceIndex) => (
        <label key={choiceIndex} className={classes.quizChoice}>
          <div className={classes.choiceContainer}>
            <input
              className={classes.choiceRadioInput}
              onChange={(event) => {
                handleChooseAnswer(event, questionIndex);
              }}
              type="radio"
              value={choiceIndex}
              name={`q${questionIndex}choice`}
              checked={quizAnswers[questionIndex] == choiceIndex}
            />{" "}
            <MathJax.Context
              input="ascii"
              script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
              onError={(MathJax, error) => {
                MathJax.Hub.Queue(MathJax.Hub.Typeset());
              }}
              options={{
                asciimath2jax: {
                  useMathMLspacing: true,
                  delimiters: [["$$", "$$"]],
                  preview: "none",
                },
              }}
            >
              <MathJax.Text text={choice} />
            </MathJax.Context>
          </div>
        </label>
      ))}
    </div>
  );

  const questions = quizQuestions
    ? quizQuestions.map((question, questionIndex) => {
        return (
          <div key={questionIndex}>
            <GridContainer className={classes.questionBlock}>
              <GridItem xs={10} sm={8} md={8}>
                <div className={classes.quizQuestion}>
                  {
                    <MathJax.Context
                      input="ascii"
                      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                      onError={(MathJax, error) => {
                        MathJax.Hub.Queue(MathJax.Hub.Typeset());
                      }}
                      options={{
                        asciimath2jax: {
                          useMathMLspacing: true,
                          delimiters: [["$$", "$$"]],
                          preview: "none",
                        },
                      }}
                    >
                      <MathJax.Text
                        text={`${strings.q[lang]}${translateNumber(
                          `${questionIndex + 1}`,
                          lang
                        )}: ${question.questionText}`}
                      />
                    </MathJax.Context>
                  }
                </div>
                {getChoices(question, questionIndex)}
              </GridItem>
              <GridItem xs={10} sm={4} md={4}>
                {question.image ? (
                  <div className={classes.imageConatainer}>
                    <img
                      className={classes.quizImage}
                      src={question.image}
                    ></img>
                    <a
                      target="_blank"
                      href={question.image}
                      className={classes.previewLink}
                    >
                      {strings.preview[lang]}
                    </a>
                  </div>
                ) : null}
              </GridItem>
            </GridContainer>
          </div>
        );
      })
    : null;

  const successModal = quizData?.showAnswers ? (
    <StudentAnswersModal
      isOpen={quizSuccess}
      quiz={{ id: quizData?.id, name: quizData?.name }}
      handleClose={handleCloseSuccessModal}
    />
  ) : (
    <SuccessModal
      onClose={handleCloseSuccessModal}
      open={quizSuccess}
      message={quizGrade}
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <ErrorModal
          open={showErrorModal}
          onClose={handleCloseErrorModal}
          message={quizError}
        />

        {quizSuccess ? successModal : null}

        <Loading loading={loading} style={{ minHeight: "80vh" }}>
          <div className={classes.fixedTitleAndTimer}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.quizTitle}>{quizData?.name}</div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem>
                <Timer
                  lastUnit="m"
                  initialTime={quizRemainingTime}
                  direction="backward"
                >
                  {({ getTime }) => {
                    return (
                      <table className={classes.timer}>
                        <thead>
                          <tr>
                            <th className={classes.time}>
                              {translateNumber(
                                parseInt(getTime() / 1000 / 60).toString(),
                                lang
                              )}
                            </th>
                            <th className={classes.time}>:</th>
                            <th className={classes.time}>
                              {translateNumber(
                                parseInt((getTime() / 1000) % 60).toString(),
                                lang
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className={classes.timerLabels}>
                              {strings.minutes[lang]}
                            </td>
                            <td></td>
                            <td className={classes.timerLabels}>
                              {strings.seconds[lang]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  }}
                </Timer>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.questionsContainer}>{questions}</div>
          <GridContainer justify="center">
            <GridItem xs={10} sm={8} md={4}>
              <Button
                onClick={submitQuiz}
                color="primary"
                className={classes.button}
                round
              >
                {strings.submit[lang]}
              </Button>
            </GridItem>
          </GridContainer>
        </Loading>
      </div>
    </div>
  );
}
