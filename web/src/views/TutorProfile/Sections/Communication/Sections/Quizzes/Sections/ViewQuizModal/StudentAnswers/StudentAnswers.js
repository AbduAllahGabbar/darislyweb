import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./studentAnswersStyle.js";
import strings from "constants/strings.js";
import Button from "components/CustomButtons/Button";
import { translateNumber } from "utils/index.js";
import { primaryColor } from "assets/jss/material-kit-pro-react.js";
import { dangerColor } from "assets/jss/material-kit-pro-react.js";
import MathJax from "react-mathjax2";

const useStyles = makeStyles(styles);

export default function StudentAnswers(props) {
  const classes = useStyles();
  const { questions, onClose } = props;

  const lang = useSelector((state) => state.lang);

  let questionsData = [];

  if (questions) {
    questions.questionsAndAnswers.forEach((question, index) => {
      questionsData.push([
        <div key={index} className={classes.questionContainer}>
          <div className={classes.question}>
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
                text={`${strings.answer[lang]}: ${
                  question.answerText === ""
                    ? strings.notAnswered[lang]
                    : question.answerText
                }`}
              />
            </MathJax.Context>
          </div>
        </div>,
      ]);
    });
  }

  return (
    <div>
      <div className={classes.header}>
        <div>
          {`${questions.student.firstName} ${questions.student.lastName}`}
        </div>
        <div>
          {`${strings.result[lang]}: `}
          {translateNumber(
            `${questions.correctCount}/${questions.questionsCount}`,
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
          className={classes.modalButton}
          onClick={onClose}
        >
          {strings.ok[lang]}
        </Button>
      </div>
    </div>
  );
}
