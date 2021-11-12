import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal.js";
import strings from "constants/strings.js";
import React from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import styles from "./openSessionModalStyle.js";
import enums from "enums";

const useStyles = makeStyles(styles);

export default function OpenSessionModal(props) {
  const classes = useStyles();

  const { student, orderItem, isOpen, handleClose, handleError, handleSuccess } = props;

  const lang = useSelector((state) => state.lang);

  const handleOpenSession = async () => {
    try {
      await api.staffSetAttendance(student.id, orderItem.session.id, enums.Attendance.ABSENT);
      handleSuccess();
    } catch (err) {
      handleError();
    } finally {
      handleClose();
    }
  };

  return (
    <CustomModal open={isOpen} onClose={handleClose}>
      <div className={classes.titleContainer}>
        {strings.openSessionQuestion[lang]}
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          color="secondary"
          round
          className={classes.modalButton}
          onClick={handleOpenSession}
        >
          {strings.yes[lang]}
        </Button>
        <Button
          color="secondary"
          round
          className={classes.modalButton}
          onClick={handleClose}
        >
          {strings.no[lang]}
        </Button>
      </div>
    </CustomModal>
  );
}
