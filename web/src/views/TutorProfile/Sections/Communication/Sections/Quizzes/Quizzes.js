import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "components/CustomButtons/Button";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading";
import Table from "components/Table/Table.js";
import strings from "constants/strings";
import enums from "enums";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { formatAMPM, translateNumber } from "utils/index.js";
import styles from "./quizzesStyle.js";
import AddQuizModal from "./Sections/AddQuizModal/AddQuizModal.js";
import EditQuizModal from "./Sections/EditQuizModal/EditQuizModal.js";
import RemoveQuizModal from "./Sections/RemoveQuizModal/RemoveQuizModal.js";
import ViewQuizModal from "./Sections/ViewQuizModal/ViewQuizModal.js";

const useStyles = makeStyles(styles);

export default function Quizzes(props) {
  const classes = useStyles();
  const [addQuizModal, setAddQuizModal] = useState({
    isOpen: false,
    active: 0,
  });
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [removeQuizModal, setRemoveQuizModal] = useState(false);
  const [viewQuizModal, setViewQuizModal] = useState(false);
  const [editQuizModal, setEditQuizModal] = useState(false);
  const [quizToBeRemoved, setQuizToBeRemoved] = useState(null);
  const [quizToBeEdited, setQuizToBeEdited] = useState(null);
  const [quizToBeViewed, setQuizToBeViewed] = useState(null);
  const [questionsCount, setQuestionsCount] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const quizzes = (await api.getQuizzes()).data.data;
        setQuizzes(quizzes);
        setLoading(false);
      } catch (err) {
        setShowErrorModal(true);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      removeQuizModal === false &&
      addQuizModal.isOpen === false &&
      quizToBeRemoved === null
    ) {
      (async () => {
        try {
          window.scrollTo(0, 0);
          setLoading(true);
          const quizzes = (await api.getQuizzes()).data.data;
          setQuizzes(quizzes);
          setLoading(false);
        } catch (err) {
          setShowErrorModal(true);
          setLoading(false);
        }
      })();
    }
  }, [removeQuizModal, addQuizModal]);

  const lang = useSelector((state) => state.lang);
  const closeAddQuizlModal = () => {
    setAddQuizModal({ ...addQuizModal, isOpen: false });
  };
  const openAddQuizlModal = () => {
    setAddQuizModal({ ...addQuizModal, isOpen: true });
  };

  let quizzesData = [];

  if (quizzes) {
    quizzes.forEach((quiz, index) => {
      let fromDatetime = new Date(quiz.from);
      let toDatetime = new Date(quiz.to);
      quizzesData.push([
        <span key={index}>{quiz.name}</span>,
        <span key={index}>{`${quiz.subjectName[lang]} - ${
          lang === "en" ? "Grade " : ""
        }${strings.grades[quiz.grade][lang]}`}</span>,
        <span key={index}>{quiz.lecture.title}</span>,
        <span key={index}>
          {translateNumber(quiz.duration.toString(), lang) +
            " " +
            strings.minutes[lang]}
        </span>,
        <span key={index}>
          <div className={classes.datetimeContainer}>
            <div>
              {strings.from[lang]}
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
            </div>
            <Button disabled color={"primary"} className={classes.time} round>
              <span style={{ textTransform: "lowercase" }}>
                {formatAMPM(
                  `${fromDatetime.getHours()}:${fromDatetime.getMinutes()}`,
                  lang
                )}
              </span>
            </Button>
          </div>
          <div className={classes.datetimeContainer}>
            <div>
              {strings.to[lang]}
              <span className={classes.date}>
                {translateNumber(
                  toDatetime.getDate() +
                    "/" +
                    (toDatetime.getMonth() + 1) +
                    "/" +
                    toDatetime.getFullYear(),
                  lang,
                  true
                )}
              </span>
            </div>
            <Button disabled color={"primary"} className={classes.time} round>
              <span style={{ textTransform: "lowercase" }}>
                {formatAMPM(
                  `${toDatetime.getHours()}:${toDatetime.getMinutes()}`,
                  lang
                )}
              </span>
            </Button>
          </div>
        </span>,
        <div className={classes.buttonsContainer}>
          <div
            onClick={() => {
              setQuizToBeViewed(quiz.id);
              setQuestionsCount(quiz.questionsCount)
              setViewQuizModal(true);
            }}
            className={classes.viewContainer}
          >
            <VisibilityIcon />
          </div>
          <div
            onClick={() => {
              setQuizToBeEdited(quiz.id);
              setEditQuizModal(true);
            }}
            className={classes.editContainer}
          >
            <EditIcon />
          </div>
          <div
            onClick={() => {
              setQuizToBeRemoved(quiz.id);
              setRemoveQuizModal(true);
            }}
            className={classes.removeContainer}
          >
            <DeleteIcon />
          </div>
        </div>,
      ]);
    });
  }
  return (
    <div className={classes.root}>
      <AddQuizModal
        isOpen={addQuizModal.isOpen}
        handleClose={closeAddQuizlModal}
      />
      <RemoveQuizModal
        isOpen={removeQuizModal}
        handleClose={() => setRemoveQuizModal(false)}
        quizId={quizToBeRemoved}
        setQuizId={setQuizToBeRemoved}
      />
      <EditQuizModal
        isOpen={editQuizModal}
        handleClose={() => setEditQuizModal(false)}
        quizId={quizToBeEdited}
        setQuizId={setQuizToBeEdited}
      />
      <ViewQuizModal
        isOpen={viewQuizModal}
        handleClose={() => setViewQuizModal(false)}
        quizId={quizToBeViewed}
        questionsCount={questionsCount}
        setQuizId={setQuizToBeViewed}
      />
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <div className={classes.header}>
            <div className={classes.quizzesLabel}>{strings.quizzes[lang]}</div>
            <Button
              round
              color="primary"
              className={classes.button}
              onClick={openAddQuizlModal}
            >
              {strings.addQuiz[lang]}
            </Button>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
              <Loading loading={loading}>
                <Table
                  tableHead={[
                    strings.name[lang],
                    strings.course[lang],
                    strings.untilLecture[lang],
                    strings.duration[lang],
                    strings.time[lang],
                    " ",
                  ]}
                  tableData={quizzesData}
                  tableHeaderColor="primaryLight"
                  round
                  pagination
                />
              </Loading>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
