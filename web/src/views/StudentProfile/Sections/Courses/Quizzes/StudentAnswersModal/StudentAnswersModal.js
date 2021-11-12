import { makeStyles } from "@material-ui/core/styles";
import {
  dangerColor,
  primaryColor,
  secondaryColor,
} from "assets/jss/material-kit-pro-react.js";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal";
import Loading from "components/Loading/Loading.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax2";
import { useSelector } from "react-redux";
import { translateNumber } from "utils/index.js";
import styles from "./studentAnswersModalStyle.js";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import api from "services/api";

const useStyles = makeStyles(styles);

export default function StudentAnswersModal(props) {
  const classes = useStyles();
  const { quiz, isOpen, handleClose } = props;
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          setLoading(true);
          const response = (await api.getCurrentStudentQuizAnswers(quiz.id))
            .data;
          setQuestions(response);
          setLoading(false);
        } catch (error) {
          setActive(1);
          setLoading(false);
        }
      })();
    } else {
      setLoading(true);
      setQuestions(null);
      setActive(0);
    }
  }, [isOpen]);

  const lang = useSelector((state) => state.lang);

  let questionsData = [];

  if (questions) {
    questions.questionsAndAnswers.forEach((question, index) => {
      questionsData.push([
        <div key={index} className={classes.questionContainer}>
          <div className={classes.question}>
            {question.image ? (
              <div className={classes.imageConatainer}>
                <img className={classes.quizImage} src={question.image}></img>
                <a
                  target="_blank"
                  href={question.image}
                  className={classes.previewLink}
                >
                  {strings.preview[lang]}
                </a>
              </div>
            ) : null}

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
                  (index + 1).toString(),
                  lang
                )}: ${question.questionText}`}
              />
            </MathJax.Context>
          </div>
          <div
            style={{
              color: question.correct ? primaryColor[0] : dangerColor[0],
              backgroundColor: question.correct
                ? primaryColor[6]
                : dangerColor[8],
            }}
            className={classes.answer}
          >
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
                text={`${strings.yourAnswer[lang]}: ${
                  question.answerText === ""
                    ? strings.notAnswered[lang]
                    : question.answerText
                }`}
              />
            </MathJax.Context>
            {question.correct ? (
              <CheckIcon className={classes.checkIcon} />
            ) : (
              <CloseIcon className={classes.closeIcon} />
            )}
          </div>
          {question.correct ? null : (
            <div
              style={{
                color: secondaryColor[0],
              }}
              className={classes.correctAnswerFault}
            >
              {strings.correctAnswer[lang]}:&nbsp;{question.correctText}
            </div>
          )}
        </div>,
      ]);
    });
  }

  let modalcontent = null;

  if (active === 0 && questions) {
    modalcontent = (
      <div>
        <div className={classes.header}>
          <div>{quiz.name}</div>
          <div>
            {`${strings.result[lang]}: `}
            {translateNumber(
              `${questions.correctCount ? questions.correctCount : 0}/${
                questions.questionsCount
              }`,
              lang,
              true
            )}
          </div>
        </div>
        <div className={"scrollbar " + classes.questionsContainer}>
          {questionsData}
        </div>
        <div className={classes.buttonsContainer}>
          <Button
            round
            color="secondary"
            className={classes.scoreButton}
            disabled
          >
            {translateNumber(
              strings.yourScore(
                questions.correctCount ? questions.correctCount : 0,
                questions.questionsCount
              )[lang],
              lang,
              true
            )}
          </Button>
          <Button
            round
            color="white"
            style={{ color: secondaryColor[0] }}
            className={classes.scoreButton}
            onClick={handleClose}
          >
            {strings.back[lang]}
          </Button>
        </div>
      </div>
    );
  } else if (active === 1) {
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
