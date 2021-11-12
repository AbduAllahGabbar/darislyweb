import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import UnderlinedNavPills from "components/NavPills/UnderlinedNavPills.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "services/api";
import { formatAMPM, translateNumber } from "utils";
import styles from "./studentQuizzesStyle.js";
import StudentAnswersModal from "./StudentAnswersModal/StudentAnswersModal";

const useStyles = makeStyles(styles);

export default function StudentQuizzes(props) {
  const classes = useStyles();
  const history = useHistory();

  const [quizzes, setQuizzes] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [quizToBeViewed, setQuizToBeViewed] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    (async () => {
      await updateQuizzes();
    })();
  }, []);

  const updateQuizzes = async () => {
    try {
      const quizzes = (await api.getQuizzes()).data.data;
      setQuizzes(quizzes);
    } catch (err) {
      setShowErrorModal(true);
    }
  };
  const lang = useSelector((state) => state.lang);

  let newQuizzesData = [];
  let completedQuizzesData = [];

  const reviewHandler = (quizId, quizName) => {
    setQuizToBeViewed({ id: quizId, name: quizName });
    setShowReviewModal(true);
  };

  if (quizzes) {
    quizzes.forEach((quiz, index) => {
      let fromDatetime = new Date(quiz.from);
      const now = new Date();
      // canSubmit checks if ( (the student hasn't viewed the quiz) .... OR (has viewed
      // the quiz AND hasn't yet submitted AND the duration hasn't passed) ) kolo el fat da AND
      // el quiz bada2
      const isNewQuiz = quiz.canSubmit || fromDatetime > now;

      isNewQuiz
        ? newQuizzesData.push([
            <span key={index}>{quiz.subjectName[lang]}</span>,
            <span key={index}>{quiz.name}</span>,
            <span key={index}>
              <div className={classes.datetimeContainer}>
                <span className={classes.date}>
                  {translateNumber(
                    fromDatetime.getDate() +
                      "/" +
                      (fromDatetime.getMonth() + 1) +
                      "/" +
                      fromDatetime.getFullYear(),
                    lang,
                    true
                  )}
                </span>
                <Button
                  disabled
                  color={"primary"}
                  className={classes.time}
                  round
                >
                  <span style={{ textTransform: "lowercase" }}>
                    {formatAMPM(
                      fromDatetime.getHours() + ":" + fromDatetime.getMinutes(),
                      lang
                    )}
                  </span>
                </Button>
              </div>
            </span>,
            <div className={classes.buttonsContainer}>
              {quiz.canSubmit ? (
                <Button
                  key={index}
                  onClick={() => takeQuiz(quiz.id)}
                  color="secondary"
                  className={classes.button}
                  round
                >
                  {strings.takeQuiz[lang]}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="transparent"
                  className={classes.button}
                  round
                  disabled
                >
                  {strings.notStarted[lang]}
                </Button>
              )}
            </div>,
          ])
        : completedQuizzesData.push([
            <span key={index}>{quiz.subjectName[lang]}</span>,
            <span key={index}>{quiz.name}</span>,
            <span key={index}>
              {quiz.grade
                ? translateNumber(
                    quiz.grade.toString() +
                      "/" +
                      quiz.questionsCount.toString(),
                    lang,
                    true
                  )
                : translateNumber(
                    "0" + "/" + quiz.questionsCount.toString(),
                    lang,
                    true
                  )}
            </span>,
            <span key={index}>
              <div className={classes.datetimeContainer}>
                <span className={classes.date}>
                  {translateNumber(
                    fromDatetime.getDate() +
                      "/" +
                      (fromDatetime.getMonth() + 1) +
                      "/" +
                      fromDatetime.getFullYear(),
                    lang,
                    true
                  )}
                </span>
                <Button
                  disabled
                  color={"primary"}
                  className={classes.time}
                  round
                >
                  <span style={{ textTransform: "lowercase" }}>
                    {formatAMPM(
                      fromDatetime.getHours() + ":" + fromDatetime.getMinutes(),
                      lang
                    )}
                  </span>
                </Button>
              </div>
            </span>,

            <Button
              key={index}
              color={quiz.showAnswers ? "secondary" : "disabled"}
              className={classes.button}
              disabled={!quiz.showAnswers}
              round
              onClick={
                quiz.showAnswers
                  ? () => reviewHandler(quiz.id, quiz.name)
                  : undefined
              }
            >
              {strings.review[lang]}
            </Button>,
          ]);
    });
  }

  const takeQuiz = (quizId) => {
    history.push({
      pathname: "/quiz",
      state: { quizId },
    });
  };

  return (
    <div>
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
      <StudentAnswersModal
        isOpen={showReviewModal}
        quiz={quizToBeViewed}
        handleClose={() => setShowReviewModal(false)}
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
          <UnderlinedNavPills
            style={{ marginTop: -35 }}
            alignCenter
            color="secondary"
            active={0}
            tabs={[
              {
                tabButton: strings.newQuizzes[lang],
                tabContent: (
                  <Table
                    pagination
                    tableHead={[
                      strings.subject[lang],
                      strings.name[lang],
                      strings.time[lang],
                      " ",
                    ]}
                    tableData={newQuizzesData}
                    tableHeaderColor="secondary"
                    round
                  />
                ),
              },
              {
                tabButton: strings.yourGrade[lang],
                tabContent: (
                  <Table
                    pagination
                    tableHead={[
                      strings.subject[lang],
                      strings.name[lang],
                      strings.result[lang],
                      strings.time[lang],
                      " ",
                    ]}
                    tableData={completedQuizzesData}
                    tableHeaderColor="secondary"
                    round
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
