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
import styles from "./removeQuizModalStyle.js";

const useStyles = makeStyles(styles);

export default function RemoveQuizModal(props) {
  const classes = useStyles();
  const { isOpen, handleClose, quizId, setQuizId } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    active: 0,
  });

  const lang = useSelector((state) => state.lang);

  const resetState = () => {
    setState({
      active: 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      resetState();
    }, 300);
  }, [isOpen]);

  const removeQuizHandler = async () => {
    try {
      setLoading(true);
      const response = await api.deleteQuiz(quizId);
      setState({ ...state, active: 1 });
      setQuizId(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setQuizId(null);
      setState({ ...state, active: 2 });
    }
  };

  let modalcontent = <div />;

  if (state.active === 0) {
    modalcontent = (
      <div>
        <div className={classes.titleContainer}>
          <CancelIcon className={classes.cancelIcon} />
        </div>
        <div className={classes.message}>{strings.removeQuizMessage[lang]}</div>
        <div className={classes.buttonsContainer}>
          <Button
            round
            color="secondary"
            className={classes.modalButton}
            onClick={handleClose}
          >
            {strings.cancel[lang]}
          </Button>
          <Button
            round
            color="danger"
            className={classes.modalButton}
            onClick={removeQuizHandler}
          >
            {strings.remove[lang]}
          </Button>
        </div>
      </div>
    );
  } else if (state.active === 1) {
    modalcontent = (
      <div>
        <div className={classes.titleContainer}>
          <CheckCircle className={classes.checkCircleIcon} />
        </div>
        <div className={classes.message}>
          {strings.quizRemovedSuccessfully[lang]}
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
  } else if (state.active === 2) {
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
