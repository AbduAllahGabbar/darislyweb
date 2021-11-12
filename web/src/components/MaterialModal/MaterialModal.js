import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";
import Loading from "components/Loading/Loading";
import SelectInput from "components/SelectInput/SelectInput";
import Table from "components/Table/Table";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import enums from "enums";
import styles from "./materialModalStyle.js";
import strings from "constants/strings.js";

const useStyles = makeStyles(styles);

export default function MaterialModal(props) {
  const classes = useStyles();
  const { open, onClose, style, courseId, message } = props;
  const lang = useSelector((state) => state.lang);
  const currentUser = useSelector((state) => state.auth);
  const [courseLectures, setCourseLectures] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState({
    value: 0,
    validation: {
      required: false,
    },
    valid: false,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        if (open) {
          const courseSections = (await api.getCourseMaterialLectures(courseId))
            .data;
          if (courseSections?.length > 0) {
            let lectures = [];
            courseSections.forEach((courseSection) => {
              courseSection.lectures.forEach((lecture) => {
                lectures.push(lecture);
              });
            });
            setCourseLectures(lectures);
          }
        }
      } catch (err) {}
    })();
  }, [open]);

  const handleSelectLecture = async (event) => {
    const updatedLecture = { ...selectedLecture };
    updatedLecture.value = event.target.value;
    setSelectedLecture(updatedLecture);

    let lectureFiles = (
      await api.getLectureMaterial(courseLectures[updatedLecture.value - 1].id)
    ).data;
    lectureFiles.forEach((file) => {
      file.toDelete = false;
      file.deleteLoading = false;
    });
    setFiles(lectureFiles);
  };

  const handleToDeleteChange = (index, toDelete) => () => {
    const updatedFiles = [...files];
    updatedFiles[index].toDelete = toDelete;
    setFiles(updatedFiles);
  };

  const handleDelete = (index) => async () => {
    setFiles((prevFiles) => {
      let updatedFiles = [...prevFiles];
      updatedFiles[index].deleteLoading = true;
      return updatedFiles;
    });
    try {
      await api.deleteLectureMaterial(files[index].id);
      setFiles((prevFiles) => {
        let updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    } catch (err) {
      setFiles((prevFiles) => {
        let updatedFiles = [...prevFiles];
        updatedFiles[index].deleteLoading = false;
        return updatedFiles;
      });
    }
  };

  const resetState = () => {
    onClose();
    setCourseLectures([]);
    setFiles([]);
    setSelectedLecture({
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    });
  };

  let filesData = [];

  files.length > 0 &&
    files.forEach((file, index) => {
      let deleteContent = [];
      if (currentUser.role === enums.UserRoles.TUTOR) {
        deleteContent.push(
          file.toDelete ? (
            <div className={classes.buttonsContainer}>
              <Loading
                loading={file.deleteLoading}
                iconStyle={{
                  width: 19,
                  height: 19,
                  marginTop: 3,
                  marginRight: 15,
                }}
              >
                <CheckCircleIcon
                  onClick={handleDelete(index)}
                  className={
                    classes.confirmDeleteIcon + " " + classes.marginRight
                  }
                />
              </Loading>
              <CancelIcon
                onClick={handleToDeleteChange(index, false)}
                className={classes.deleteIcon}
              />
            </div>
          ) : (
            <DeleteIcon
              onClick={handleToDeleteChange(index, true)}
              className={classes.deleteIcon}
            />
          )
        );
      }

      filesData.push([
        <span key={index}>{file.name}</span>,
        <span key={index}>{file.name.split(".").pop().toUpperCase()}</span>,
        <a
          href={`${process.env.REACT_APP_API_HOST}/lectures/material/${file.id}`}
        >
          <Button
            key="download-btn"
            color="primary"
            className={classes.button}
            round
          >
            <span>{strings.download[lang]}</span>
          </Button>
        </a>,
        ...deleteContent,
      ]);
    });

  let lecturesData = [];
  if (courseLectures.length > 0) {
    lecturesData = courseLectures.map((lecture, index) => {
      return {
        name: lecture.title,
        value: index + 1,
      };
    });
  }

  let tableHead = [strings.name[lang], strings.fileType[lang], " "];
  if (currentUser.role === enums.UserRoles.TUTOR) {
    tableHead.push(" ");
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal,
        container: classes.container,
      }}
      open={open}
      keepMounted
      onClose={resetState}
    >
      <DialogTitle disableTypography className={classes.modalHeader}>
        <Button
          simple
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={resetState}
        >
          <Close className={classes.modalClose} />
        </Button>
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.gridItem}
            style={{ marginTop: 20 }}
            style={style}
          >
            <div className={classes.selectContainer}>
              <SelectInput
                id="lectures-material"
                selectStyle={classes.select}
                placeholder={strings.selectLecture[lang]}
                data={lecturesData}
                value={selectedLecture.value}
                onSelect={handleSelectLecture}
                errorMessage={
                  selectedLecture.error && selectedLecture.error[lang]
                }
              />
            </div>

            <Table
              tableHead={tableHead}
              tableData={filesData}
              tableHeaderColor="secondary"
              round
              pagination
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
