import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import ErrorModal from "components/ErrorModal/ErrorModal";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loading from "components/Loading/Loading.js";
import CheckCircle from "@material-ui/icons/CheckCircle";
import CustomModal from "components/CustomModal/CustomModal";
import SelectInput from "components/SelectInput/SelectInput";
import SuccessModal from "components/SuccessModal/SuccessModal";
import MaterialModal from "components/MaterialModal/MaterialModal";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import DropFiles from "components/DropFiles/DropFiles";
import Table from "components/Table/Table";
import strings from "constants/strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "services/api";
import { checkValidity } from "utils";
import styles from "./materialStyle.js";

const useStyles = makeStyles(styles);

export default function Material(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [showUploadMaterialModal, setShowUploadMaterialModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseLectures, setCourseLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState({
    value: 0,
    validation: {
      required: false,
    },
    valid: false,
    error: null,
  });

  const [files, setFiles] = useState([]);
  const [activeModalContent, setActiveModalContent] = useState(0);
  const [values, setValues] = useState({
    message: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 500,
      },
      valid: false,
      error: null,
    },
  });
  const [courseSelect, setCourseSelect] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadButtonLoading, setUploadButtonLoading] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  const currentUser = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          const response = (await api.getTutorCourses(currentUser.id)).data;
          setCourses(response);
        }
      } catch (err) {}
    })();
  }, []);

  const handleOpenMaterialModal = (courseId, showModalHandler) => async () => {
    setSelectedCourseId(courseId);
    showModalHandler(true);
    const courseSections = (await api.getCourseLectures(courseId)).data;
    if (courseSections?.length > 0) {
      let lectures = [];
      courseSections.forEach((courseSection) => {
        courseSection.lectures.forEach((lecture) => {
          lectures.push(lecture);
        });
      });
      setCourseLectures(lectures);
    }
  };

  const handleCloseUploadMaterialModal = () => {
    setShowUploadMaterialModal(false);
    setSelectedCourseId(null);
    setActiveModalContent(0);
  };

  const handleRemoveFile = (index) => () => {
    let updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const resetState = () => {
    setSelectedCourseId(null);
    setCourseLectures([]);
    setSelectedLecture({
      value: 0,
      validation: {
        required: false,
      },
      valid: false,
      error: null,
    });
    setFiles([]);
    setCourseSelect(0);
    setUploadButtonLoading(false);
  };

  const handleUploadMaterial = async () => {
    const updatedLecture = { ...selectedLecture };
    updatedLecture.error =
      updatedLecture.value === 0 ? strings.errors.required : null;
    updatedLecture.valid = updatedLecture.error === null;
    setSelectedLecture(updatedLecture);
    const isFormValid = updatedLecture.valid;
    if (isFormValid) {
      setUploadButtonLoading(true);
      await api.addLectureMaterial(
        { files },
        courseLectures[selectedLecture.value - 1].id
      );
      setActiveModalContent(1);
      resetState();
    }
  };

  const handleSelectLecture = (event) => {
    const updatedLecture = { ...selectedLecture };
    updatedLecture.value = event.target.value;
    setSelectedLecture(updatedLecture);
  };

  const onDrop = (droppedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  let coursesData = [];

  courses &&
    courses.forEach((course, index) => {
      coursesData.push([
        <span key={index}>{`${course.subject.name[lang]} - ${
          strings.educations[course.education][lang]
        } - ${lang === "en" ? "Grade " : ""}${
          strings.grades[course.grade][lang]
        }`}</span>,
        <div className={classes.buttonsContainer}>
          <Button
            key="upload-btn"
            color="secondary"
            className={classes.button + " " + classes.marginRight}
            onClick={handleOpenMaterialModal(
              course.id,
              setShowUploadMaterialModal
            )}
            round
          >
            <span>{strings.uploadMaterial[lang]}</span>
          </Button>

          <Button
            key="manage-btn"
            color="primary"
            className={classes.button}
            onClick={handleOpenMaterialModal(course.id, setShowMaterialModal)}
            round
          >
            <span>{strings.manageMaterial[lang]}</span>
          </Button>
        </div>,
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

  const modalContent = activeModalContent ? (
    <div>
      <div className={classes.titleContainer}>
        <CheckCircle className={classes.checkCircleIcon} />
      </div>
      <div className={classes.message}>
        {strings.filesUploadedSuccessfully[lang]}
      </div>
      <div className={classes.successButtonContainer}>
        <Button
          round
          color="secondary"
          className={classes.modalButton}
          onClick={handleCloseUploadMaterialModal}
        >
          {strings.ok[lang]}
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <SelectInput
        id="lectures"
        selectStyle={classes.select}
        placeholder={strings.selectLecture[lang]}
        data={lecturesData}
        value={selectedLecture.value}
        onSelect={handleSelectLecture}
        errorMessage={selectedLecture.error && selectedLecture.error[lang]}
      />
      <DropFiles
        onDrop={onDrop}
        files={files}
        onFileRemoved={handleRemoveFile}
      />
      {files.length > 0 ? (
        <Loading loading={uploadButtonLoading}>
          <div className={classes.uploadModalButton}>
            <Button color="primary" onClick={handleUploadMaterial} round>
              <span>{strings.uploadMaterial[lang]}</span>
            </Button>
          </div>
        </Loading>
      ) : null}
    </div>
  );

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} className={classes.gridItem}>
        {/* <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={strings.announcementSentSuccess[lang]}
        /> */}
        <GridContainer justify="center" className={classes.selectRow}>
          <GridItem xs={12} sm={8} md={10} className={classes.gridItem}>
            <Loading loading={loading}>
              <Table
                tableHead={[strings.course[lang], " "]}
                tableData={coursesData}
                tableHeaderColor="primaryLight"
                round
                pagination
              />

              <CustomModal
                open={showUploadMaterialModal}
                onClose={handleCloseUploadMaterialModal}
              >
                {modalContent}
              </CustomModal>

              <MaterialModal
                open={showMaterialModal}
                onClose={() => setShowMaterialModal(false)}
                courseId={selectedCourseId}
                lecturesData={lecturesData}
                selectedLecture={selectedLecture}
                onLectureSelect={handleSelectLecture}
              />
            </Loading>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
