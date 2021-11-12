import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import CustomModal from "components/CustomModal/CustomModal.js";
import Loading from "components/Loading/Loading.js";
import Table from "components/Table/Table.js";
import strings from "constants/strings.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import styles from "./chooseLectureModalStyle.js";
import ChooseSessionModal from "./ChooseSessionModal/ChooseSessionModal.js";

const useStyles = makeStyles(styles);
export default function ChooseLectureModal(props) {
  const classes = useStyles();

  const {
    isOpen,
    handleClose,
    handleError,
    handleSuccess,
    student,
    orderItem,
    orderId,
  } = props;

  const [lectures, setLectures] = useState(null);
  const [newLectureId, setNewLectureId] = useState(null);
  const [editModalLoading, setEditModalLoading] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);

  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          setEditModalLoading(true);
          const sessions = (
            await api.getStudentCourseLectures(
              student.id,
              orderItem.course.id,
              orderId
            )
          ).data;
          setLectures(sessions);
          setEditModalLoading(false);
        } catch (err) {
          handleClose();
          handleError();
        }
      })();
    }
  }, [isOpen]);

  useEffect(() => setNewLectureId(orderItem?.lecture?.id), [orderItem]);

  let lecturesData = [];
  if (lectures) {
    lectures.sections.forEach((section) => {
      section.lectures.forEach((lecture, lectureIndex) => {
        if (!lecture.purchased) {
          lecturesData.push([
            <span key={lectureIndex}>{section.title}</span>,
            <span key={lectureIndex}>{lecture.title}</span>,
            <span key={lectureIndex}>{lecture.price}</span>,
            <input
              type="radio"
              key={lectureIndex}
              name="lectures"
              value={lecture.id}
              checked={lecture.id == newLectureId}
              onChange={(event) => {
                handleChooseLecture(event);
              }}
            />,
          ]);
        }
      });
    });
  }

  const handleChooseLecture = (event) => {
    setNewLectureId(event.target.value);
  };

  const handleEditButton = () => {
    handleClose();
    setSessionModalOpen(true);
  };

  const onCloseSessionModal = () => {
    setSessionModalOpen(false);
  };

  const handleSessionModalError = () => {
    handleClose();
    handleError();
  };

  return (
    <div>
      <CustomModal open={isOpen} onClose={handleClose}>
        <Loading style={{ height: 175 }} loading={editModalLoading}>
          <div
            className="scrollbar"
            style={{ maxHeight: "70vh", overflowY: "scroll" }}
          >
            <Table
              tableHead={[
                strings.section[lang],
                strings.lecture[lang],
                strings.price[lang],
                " ",
              ]}
              tableData={lecturesData}
              tableHeaderColor="secondary"
              round
            />
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              justIcon
              round
              color="primary"
              onClick={() => {
                handleEditButton();
              }}
              style={{ width: 100 }}
            >
              {strings.edit[lang]}
            </Button>
          </div>
        </Loading>
      </CustomModal>
      <ChooseSessionModal
        isOpen={sessionModalOpen}
        handleClose={onCloseSessionModal}
        handleError={handleSessionModalError}
        handleSuccess={handleSuccess}
        orderItem={orderItem}
        lectureId={newLectureId}
      ></ChooseSessionModal>
    </div>
  );
}
