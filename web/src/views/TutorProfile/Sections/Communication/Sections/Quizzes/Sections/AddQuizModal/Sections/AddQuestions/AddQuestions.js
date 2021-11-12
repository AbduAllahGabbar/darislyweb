import Checkbox from "@material-ui/core/Checkbox";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Check from "@material-ui/icons/Check";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "components/CustomButtons/Button";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel";
import strings from "constants/strings.js";
import React, { useEffect, useRef } from "react";
import MathJax from "react-mathjax2";
import { useSelector } from "react-redux";
import { generateRandomString, translateNumber } from "utils/index.js";
import styles from "./addQuestionsStyle.js";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(styles);

function Answer(props) {
  const {
    index,
    allQuestions,
    setQuizQuestions,
    questionIndex,
    scrollToBottom,
  } = props;

  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [answer, setAnswer] = React.useState({
    answerText: "",
  });

  useEffect(() => {
    setAnswer(allQuestions[questionIndex].answers[index]);
  }, []);

  useEffect(() => {
    setAnswer(allQuestions[questionIndex].answers[index]);
  }, [allQuestions]);

  const handleAnswerChange = (event) => {
    let tempAnswer = { ...answer };
    tempAnswer.answerText = event.target.value;
    setAnswer(tempAnswer);
  };

  const handleInputOnBlur = () => {
    let tempQuestions = [...allQuestions];
    tempQuestions[questionIndex].answers[index].answerText = answer.answerText;
    setQuizQuestions(tempQuestions);
  };

  const addAnswerHandler = () => {
    let questions = [...allQuestions];
    let answers = [...questions[questionIndex].answers];
    answers.splice(index + 1, 0, {
      answerText: "",
      error: null,
    });
    questions[questionIndex].answers = answers;
    setQuizQuestions(questions);
    if (
      questionIndex === allQuestions.length - 1 &&
      index === answers.length - 2
    ) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const removeQuestionHandler = () => {
    let questions = [...allQuestions];
    let answers = [...questions[questionIndex].answers];
    answers.splice(index, 1);
    questions[questionIndex].answers = answers;
    setQuizQuestions(questions);
  };

  const handleCorrectAnswer = () => {
    let questions = [...allQuestions];
    questions[questionIndex].correctAnswerIndex = index;
    setQuizQuestions(questions);
  };

  return (
    <div>
      <GridContainer justify="center" className={classes.answerContainer}>
        <GridItem xs={1} sm={1} md={1} className={classes.gridItem}>
          <Checkbox
            onClick={() => handleCorrectAnswer()}
            checked={allQuestions[questionIndex].correctAnswerIndex === index}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
              checked: classes.checked,
              root: classes.checkRoot,
            }}
          />
        </GridItem>
        <GridItem
          xs={8}
          sm={8}
          md={8}
          className={classes.gridItem + " " + classes.answer}
        >
          <InputWithLabel
            formControlProps={{
              fullWidth: true,
            }}
            type="text"
            placeholder={strings.enterAnAnswer[lang]}
            formControlStyle={classes.answerFormControl}
            inputStyle={classes.input}
            value={answer.answerText}
            inputProps={{
              onChange: handleAnswerChange,
              multiline: true,
              onBlur: handleInputOnBlur,
            }}
            errorMessage={
              allQuestions[questionIndex].answers[index].error &&
              allQuestions[questionIndex].answers[index].error[lang]
            }
          />
        </GridItem>
        <GridItem
          xs={1}
          sm={1}
          md={1}
          className={classes.gridItem + " " + classes.addIconContainer}
        >
          <div
            onClick={(event) => setAnchorEl(event.currentTarget)}
            className={classes.viewContainer}
          >
            <VisibilityIcon />
          </div>
          <Popover
            classes={{
              paper: classes.popover,
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
          >
            <div className={classes.popoverBody}>
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
                <MathJax.Text text={answer.answerText} />
              </MathJax.Context>
            </div>
          </Popover>
        </GridItem>
        <GridItem
          xs={1}
          sm={1}
          md={1}
          className={classes.gridItem + " " + classes.addIconContainer}
        >
          <AddCircleIcon
            onClick={addAnswerHandler}
            className={classes.addIcon}
          />
        </GridItem>
        {allQuestions[questionIndex].answers.length === 1 ? (
          <GridItem
            xs={1}
            sm={1}
            md={1}
            className={classes.gridItem + " " + classes.addIconContainer}
          >
            <RemoveCircleIcon className={classes.removeIconDisabled} />
          </GridItem>
        ) : (
          <GridItem
            xs={1}
            sm={1}
            md={1}
            className={classes.gridItem + " " + classes.addIconContainer}
          >
            <RemoveCircleIcon
              onClick={removeQuestionHandler}
              className={classes.removeIcon}
            />
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}

function Question(props) {
  const {
    index,
    answers,
    allQuestions,
    setQuizQuestions,
    scrollToBottom,
  } = props;

  const classes = useStyles();
  const lang = useSelector((state) => state.lang);
  const [question, setQuestion] = React.useState({
    questionText: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showAttach, setShowAttach] = React.useState(false);

  useEffect(() => {
    setQuestion(allQuestions[index]);
  }, []);

  useEffect(() => {
    setQuestion(allQuestions[index]);
  }, [allQuestions]);

  const handleQuestionChange = (event) => {
    let tempQuestion = { ...question };
    tempQuestion.questionText = event.target.value;
    setQuestion(tempQuestion);
  };

  const handleInputOnBlur = () => {
    let tempQuestions = [...allQuestions];
    tempQuestions[index].questionText = question.questionText;
    setQuizQuestions(tempQuestions);
    console.log("BLUR");
  };

  const addQuestionHandler = () => {
    let questions = [...allQuestions];
    questions.splice(index + 1, 0, {
      questionText: "",
      id: generateRandomString(),
      image: null,
      hasImage: 0,
      answers: [
        {
          answerText: "",
          error: null,
        },
      ],
      correctAnswerIndex: 0,
      error: null,
    });
    setQuizQuestions(questions);
    if (index === allQuestions.length - 1) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const removeQuestionHandler = () => {
    let questions = [...allQuestions];
    questions.splice(index, 1);
    setQuizQuestions(questions);
  };

  const attachClickHandler = () => {
    setShowAttach(!showAttach);
  };

  const onImageChange = (imageData) => {
    let questions = [...allQuestions];
    questions[index].image = imageData;
    setQuizQuestions(questions);
  };

  return (
    <div className={classes.questionContainer}>
      <GridContainer justify="center" className={classes.rowContainer}>
        <GridItem xs={1} sm={1} md={1} className={classes.gridItem}>
          <div className={classes.label}>
            {strings.q[lang] + translateNumber((index + 1).toString(), lang)}
          </div>
        </GridItem>
        <GridItem xs={7} sm={7} md={7} className={classes.gridItem}>
          <InputWithLabel
            formControlProps={{
              fullWidth: true,
            }}
            type="text"
            placeholder={strings.enterTheQuestion[lang]}
            formControlStyle={classes.formControl}
            inputStyle={classes.input + " " + classes.inputPadding}
            value={question.questionText}
            inputProps={{
              onChange: handleQuestionChange,
              multiline: true,
              onBlur: handleInputOnBlur,
            }}
            errorMessage={
              allQuestions[index].error && allQuestions[index].error[lang]
            }
          />
        </GridItem>
        <GridItem
          xs={1}
          sm={1}
          md={1}
          className={classes.gridItem + " " + classes.addIconContainer}
        >
          <div
            onClick={(event) => setAnchorEl(event.currentTarget)}
            className={classes.viewContainer}
          >
            <VisibilityIcon />
          </div>
          <Popover
            classes={{
              paper: classes.popover,
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
          >
            <div className={classes.popoverBody}>
              <MathJax.Context
                input="ascii"
                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                onError={(MathJax) => {
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
                <MathJax.Text text={question.questionText} />
              </MathJax.Context>
            </div>
          </Popover>
        </GridItem>
        <GridItem
          xs={1}
          sm={1}
          md={1}
          className={classes.gridItem + " " + classes.addIconContainer}
        >
          <AttachFileIcon
            onClick={attachClickHandler}
            className={classes.attachmentIcon}
          />
        </GridItem>
        <GridItem
          xs={1}
          sm={1}
          md={1}
          className={classes.gridItem + " " + classes.addIconContainer}
        >
          <AddCircleIcon
            onClick={addQuestionHandler}
            className={classes.addIcon}
          />
        </GridItem>
        {allQuestions.length === 1 ? (
          <GridItem
            xs={1}
            sm={1}
            md={1}
            className={classes.gridItem + " " + classes.addIconContainer}
          >
            <RemoveCircleIcon className={classes.removeIconDisabled} />
          </GridItem>
        ) : (
          <GridItem
            xs={1}
            sm={1}
            md={1}
            className={classes.gridItem + " " + classes.addIconContainer}
          >
            <RemoveCircleIcon
              onClick={removeQuestionHandler}
              className={classes.removeIcon}
            />
          </GridItem>
        )}
      </GridContainer>
      <GridContainer className={classes.zeroMargin}>
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <Collapse in={showAttach}>
            <ImageUpload
              image={allQuestions[index].image}
              onChange={onImageChange}
              className={classes.imageUpload}
              addButtonProps={{ round: true, color: "secondary" }}
              changeButtonProps={{ round: true, color: "warning" }}
              removeButtonProps={{ round: true, color: "danger" }}
            />
          </Collapse>
        </GridItem>
      </GridContainer>
      {answers}
    </div>
  );
}

export default function AddQuestions(props) {
  const classes = useStyles();
  const {
    onClose,
    quizQuestions,
    setQuizQuestions,
    submitHandler,
    edit,
    hanldeBack,
  } = props;
  const addQuestionsContainer = useRef(null);

  const scrollToBottom = () => {
    addQuestionsContainer.current.scrollTo({
      top: addQuestionsContainer.current.scrollHeight,
      behavior: "smooth",
    });
  };

  let questionElements = [];
  if (quizQuestions) {
    quizQuestions.forEach((question, questionIndex) => {
      let answerElements = [];
      question.answers.forEach((_, answerIndex) => {
        answerElements.push(
          <Answer
            key={answerIndex}
            setQuizQuestions={setQuizQuestions}
            allQuestions={quizQuestions}
            index={answerIndex}
            questionIndex={questionIndex}
            scrollToBottom={scrollToBottom}
          />
        );
      });
      questionElements.push(
        <Question
          key={question.id}
          setQuizQuestions={setQuizQuestions}
          allQuestions={quizQuestions}
          index={questionIndex}
          answers={answerElements}
          scrollToBottom={scrollToBottom}
        />
      );
    });
  }
  const lang = useSelector((state) => state.lang);

  const handleSubmit = () => {
    let isFormValid = true;
    let updatedQuestionsArray = [];
    quizQuestions.forEach((question) => {
      const updatedQuestion = { ...question };
      updatedQuestion.error =
        updatedQuestion.questionText === "" ? strings.errors.required : null;
      isFormValid = isFormValid && updatedQuestion.error === null;

      let updatedAnswersArray = [];
      question.answers.forEach((answer) => {
        const updatedAnswer = { ...answer };
        updatedAnswer.error =
          updatedAnswer.answerText === "" ? strings.errors.required : null;
        isFormValid = isFormValid && updatedAnswer.error === null;
        updatedAnswersArray.push(updatedAnswer);
      });

      updatedQuestion.answers = [...updatedAnswersArray];
      updatedQuestionsArray.push(updatedQuestion);
    });

    setQuizQuestions(updatedQuestionsArray);

    if (isFormValid) {
      submitHandler();
    }
  };

  return (
    <div>
      <div
        ref={addQuestionsContainer}
        className={"scrollbar " + classes.addQuestionsContainer}
      >
        <div className={classes.header}>
          {edit ? strings.editQuestions[lang] : strings.addQuestions[lang]}
        </div>
        <div className={classes.questionsContainer}>{questionElements}</div>
      </div>
      <div className={classes.buttonsContainer}>
        {edit ? (
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={hanldeBack}
          >
            {strings.back[lang]}
          </Button>
        ) : (
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={onClose}
          >
            {strings.cancel[lang]}
          </Button>
        )}
        <Button
          round
          color="primary"
          className={classes.modalButton}
          onClick={handleSubmit}
        >
          {strings.submit[lang]}
        </Button>
      </div>
    </div>
  );
}

AddQuestions.defaultProps = {
  edit: false,
};
