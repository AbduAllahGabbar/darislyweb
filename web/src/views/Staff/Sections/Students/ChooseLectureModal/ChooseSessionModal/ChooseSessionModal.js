import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal.js";
import Loading from "components/Loading/Loading.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { formatAMPM, getDateString } from "utils";
import styles from "./chooseSessionModalStyle";

const useStyles = makeStyles(styles);
export default function ChooseSessionModal(props) {
  const classes = useStyles();

  const {
    isOpen,
    handleClose,
    handleError,
    handleSuccess,
    lectureId,
    orderItem,
  } = props;

  const [sessions, setSessions] = useState(null);
  const [newSessionId, setNewSessionId] = useState(null);
  const [editModalLoading, setEditModalLoading] = useState(false);

  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          setEditModalLoading(true);
          const sessions = (await api.getLectureSessions(lectureId)).data;
          setSessions(sessions);
          setEditModalLoading(false);
        } catch (err) {
          handleClose();
          handleError();
        }
      })();
    }
  }, [isOpen]);

  useEffect(() => setNewSessionId(orderItem?.session?.id), [orderItem]);

  let sessionsData = [];
  if (sessions) {
    sessions.forEach((session, sessionIndex) => {
      let date = new Date(session.date);
      sessionsData.push([
        <span key={sessionIndex}>{strings.weekDays[lang][date.getDay()]}</span>,
        <span key={sessionIndex}>{getDateString(date, lang)}</span>,
        <span key={sessionIndex}>{formatAMPM(session.from, lang)}</span>,
        <input
          type="radio"
          key={sessionIndex}
          name="sessions"
          value={session.id}
          checked={session.id == newSessionId}
          onChange={(event) => {
            handleChooseLecture(event);
          }}
        />,
      ]);
    });
  }

  const handleChooseLecture = (event) => {
    setNewSessionId(event.target.value);
  };

  const handleEditOrderItem = async () => {
    try {
      setEditModalLoading(true);
      const res = await api.migrateOrderItem(orderItem.id, newSessionId);
      handleSuccess();
    } catch (err) {
      handleError();
    } finally {
      setEditModalLoading(false);
      handleClose();
    }
  };

  return (
    <CustomModal open={isOpen} onClose={handleClose}>
      <Loading style={{ height: 175 }} loading={editModalLoading}>
        <div
          className="scrollbar"
          style={{ maxHeight: "70vh", overflowY: "scroll" }}
        >
          <Table
            tableHead={[
              strings.day[lang],
              strings.date[lang],
              strings.time[lang],
              " ",
            ]}
            tableData={sessionsData}
            tableHeaderColor="secondary"
            round
          />
        </div>
        <div className={classes.buttonsContainer}>
          <Button
            disabled={newSessionId == null}
            justIcon
            round
            color="primary"
            onClick={handleEditOrderItem}
            style={{ width: 100 }}
          >
            {strings.edit[lang]}
          </Button>
        </div>
      </Loading>
    </CustomModal>
  );
}
