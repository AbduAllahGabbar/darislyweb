import { makeStyles } from "@material-ui/core";
import CustomModal from "components/CustomModal/CustomModal.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import GridItem from "components/Grid/GridItem.js";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import addLecturesStyle from "./addLecturesStyle";
import RenderSections from "./RenderSections.js";
import strings from "constants/strings";
import { checkValidity } from "utils";
import NextBackStepper from "components/NextBackStepper/NextBackStepper";
import { editSections } from "../../store/actions";

const useStyles = makeStyles(addLecturesStyle);

export default function AddLectures(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const lang = useSelector((state) => state.lang);

  const sectionsRedux = useSelector((state) => state.course.sections);
  const taxPercentage = useSelector((state) => state.course.taxPercentage);
  const serviceFees = useSelector((state) => state.course.serviceFees);

  const [values, setValues] = useState({
    editSectionFlag: false,
    sectionTitle: "",
    payBySection: false,
    errorMessage: "",
    handleType: "add",
    modal: false,
    sectionModal: false,
    deleteLectureModal: false,
    deleteSectionModal: false,
    lectureIndex: 0,
    sectionIndex: 0,
    lectureName: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 1000,
      },
      valid: false,
      error: null,
    },
    price: {
      value: "",
      validation: {
        required: true,
        number: true,
        minLength: 1,
        maxLength: 5,
      },
      valid: false,
      error: null,
    },
    sectionIndex: 0,
    sectionName: {
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 1000,
      },
      valid: false,
      error: null,
    },
  });

  const handleChange = (prop) => (event) => {
    const updatedElement = { ...values[prop] };
    updatedElement.value = event.target.value;

    setValues({ ...values, [prop]: updatedElement });
  };

  const addLecture = (
    sectionIndex,
    index,
    type = "add",
    title = "",
    price = ""
  ) => () => {
    let lectureName = { ...values.lectureName };
    let lecturePrice = { ...values.price };
    lectureName.value = title;
    lecturePrice.value = price;
    setValues({
      ...values,
      sectionIndex: sectionIndex,
      lectureIndex: index,
      modal: true,
      handleType: type,
      lectureName: lectureName,
      price: lecturePrice,
    });
  };

  const deleteLecture = (sectionIndex, index) => () => {
    setValues({
      ...values,
      sectionIndex: sectionIndex,
      lectureIndex: index,
      deleteLectureModal: true,
    });
  };

  const deleteSection = (index) => () => {
    setValues({ ...values, sectionIndex: index, deleteSectionModal: true });
  };

  const addSection = (index) => () => {
    setValues({
      ...values,
      sectionIndex: index,
      sectionModal: true,
      editSectionFlag: false,
    });
  };

  const editSection = (index) => () => {
    setValues({
      ...values,
      sectionIndex: index,
      sectionModal: true,
      editSectionFlag: true,
    });
  };

  const handleAddSection = async () => {
    let isFormValid = true;
    let updatedValues = { sectionName: values.sectionName };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;
      updatedElement.error = checkValidity(val, updatedElement.validation);
      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    setValues({ ...values, ...updatedValues });

    if (isFormValid) {
      //Call api add lecture
      let section = {
        title: values.sectionName.value,
        payBySection: false,
        lectures: [],
      };
      let sections = sectionsRedux;
      sections.splice(values.sectionIndex, 0, section);
      dispatch(editSections(sections));
      setValues({
        ...values,
        sectionModal: false,
        sectionIndex: 0,
        sectionName: {
          value: "",
          validation: {
            required: true,
            minLength: 1,
            maxLength: 50,
          },
          valid: false,
          error: null,
        },
      });
    }
  };

  const handleEditSection = async () => {
    let isFormValid = true;
    let updatedValues = { sectionName: values.sectionName };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;
      updatedElement.error = checkValidity(val, updatedElement.validation);
      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    setValues({ ...values, ...updatedValues });

    if (isFormValid) {
      //Call api add lecture
      let sections = [...sectionsRedux];
      sections[values.sectionIndex].title = values.sectionName.value;
      dispatch(editSections(sections));
      setValues({
        ...values,
        sectionModal: false,
        sectionIndex: 0,
        sectionName: {
          value: "",
          validation: {
            required: true,
            minLength: 1,
            maxLength: 50,
          },
          valid: false,
          error: null,
        },
      });
    }
  };

  const handleDeleteLecture = async () => {
    let sectionIndex = values.sectionIndex;
    let sections = sectionsRedux;
    let lectures = sections[sectionIndex].lectures;
    lectures.splice(values.lectureIndex, 1);
    sections[sectionIndex].lectures = lectures;
    dispatch(editSections(sections));
    setValues({
      ...values,
      deleteLectureModal: false,
      lectureIndex: 0,
    });
  };

  const handleDeleteSection = async () => {
    let sections = sectionsRedux;
    sections.splice(values.sectionIndex, 1);
    dispatch(editSections(sections));
    setValues({
      ...values,
      deleteSectionModal: false,
      sectionIndex: 0,
    });
  };

  const handleEditLecture = async () => {
    let sectionIndex = values.sectionIndex;
    let sections = [...sectionsRedux];
    let lectures = [...sections[sectionIndex].lectures];
    lectures[values.lectureIndex].title = values.lectureName.value;
    lectures[values.lectureIndex].price = values.price.value;
    sections[sectionIndex].lectures = lectures;
    dispatch(editSections(sections));
  };

  const handleAddLecture = async () => {
    let lecture = {
      title: values.lectureName.value,
      price: values.price.value,
    };
    let sectionIndex = values.sectionIndex;
    let sections = sectionsRedux;
    let lectures = sections[sectionIndex].lectures;
    lectures.splice(values.lectureIndex, 0, lecture);
    sections[sectionIndex].lectures = lectures;
    dispatch(editSections(sections));
  };

  const handleLecture = async () => {
    let isFormValid = true;
    let updatedValues = {
      lectureName: values.lectureName,
      price: values.price,
    };
    Object.keys(updatedValues).forEach((key) => {
      const updatedElement = { ...updatedValues[key] };
      let val = updatedElement.value;
      console.log(val);
      updatedElement.error = checkValidity(
        val.toString(),
        updatedElement.validation
      );
      updatedElement.valid = updatedElement.error === null;
      updatedValues = { ...updatedValues, [key]: updatedElement };
      isFormValid = isFormValid && updatedElement.valid;
    });
    setValues({ ...values, ...updatedValues });

    if (isFormValid) {
      if (values.handleType === "add") {
        handleAddLecture();
      } else {
        handleEditLecture();
      }
      setValues({
        ...values,
        modal: false,
        lectureName: {
          value: "",
          validation: {
            required: true,
            minLength: 1,
            maxLength: 50,
          },
          valid: false,
          error: null,
        },
        price: {
          value: "",
          validation: {
            required: true,
            number: true,
            minLength: 1,
            maxLength: 5,
          },
          valid: false,
          error: null,
        },
      });
    }
  };
  const handleSelectSection = (sectionIndex) => () => {
    let sections = [...sectionsRedux];
    sections[sectionIndex]["payBySection"] = sections[sectionIndex][
      "payBySection"
    ]
      ? false
      : true;
    dispatch(editSections(sections));
  };

  const handleNext = (step) => {
    let isFormValid = true;
    if (sectionsRedux.length === 0) {
      isFormValid = false;
      setValues({ ...values, errorMessage: strings.errors.required[lang] });
    }
    if (isFormValid) props.handleNext(step);
  };

  return (
    <div>
      <CustomModal
        open={values.modal}
        onClose={() => setValues({ ...values, modal: false })}
      >
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.lecture[lang]}:</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={7} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              value={values.lectureName.value}
              valid={values.lectureName.isValid}
              errorMessage={
                values.lectureName.error && values.lectureName.error[lang]
              }
              inputProps={{
                onChange: handleChange("lectureName"),
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.price[lang]}:</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={7} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              value={values.price.value}
              valid={values.price.isValid}
              type={"number"}
              errorMessage={values.price.error && values.price.error[lang]}
              inputProps={{
                onChange: handleChange("price"),
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={8} className={classes.buttonCenter}>
            <Button onClick={handleLecture} color="primary" round>
              {strings.confirm[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </CustomModal>
      <CustomModal
        open={values.sectionModal}
        onClose={() => setValues({ ...values, sectionModal: false })}
      >
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={2} className={classes.gridItem}>
            <p className={classes.label}>{strings.section[lang]}:</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={7} className={classes.gridItem}>
            <InputWithLabel
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses,
              }}
              value={values.sectionName.value}
              valid={values.sectionName.isValid}
              errorMessage={
                values.sectionName.error && values.sectionName.error[lang]
              }
              inputProps={{
                onChange: handleChange("sectionName"),
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={8} className={classes.buttonCenter}>
            <Button
              onClick={
                values.editSectionFlag ? handleEditSection : handleAddSection
              }
              color="primary"
              round
            >
              {strings.confirm[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </CustomModal>
      <CustomModal
        open={values.deleteLectureModal}
        onClose={() => setValues({ ...values, deleteLectureModal: false })}
      >
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <p className={classes.label}>
              {strings.deleteLectureMessage[lang]}
            </p>
            {/* {strings.section[lang]} */}
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button
              onClick={() =>
                setValues({ ...values, deleteLectureModal: false })
              }
              color="secondary"
              round
            >
              {strings.no[lang]}
            </Button>
          </GridItem>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button onClick={handleDeleteLecture} color="primary" round>
              {strings.yes[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </CustomModal>
      <CustomModal
        open={values.deleteSectionModal}
        onClose={() => setValues({ ...values, deleteSectionModal: false })}
      >
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={12} sm={12} md={8} className={classes.gridItem}>
            <p className={classes.label}>
              {strings.deleteSectionMessage[lang]}
            </p>
            {/* {strings.section[lang]} */}
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className={classes.rowContainer}>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button
              onClick={() =>
                setValues({ ...values, deleteSectionModal: false })
              }
              color="secondary"
              round
            >
              {strings.no[lang]}
            </Button>
          </GridItem>
          <GridItem xs={6} sm={6} md={3} className={classes.buttonCenter}>
            <Button onClick={handleDeleteSection} color="primary" round>
              {strings.yes[lang]}
            </Button>
          </GridItem>
        </GridContainer>
      </CustomModal>
      {props.publish ? null : (
        <NextBackStepper
          handleNext={handleNext}
          handleBack={props.handleBack}
        />
      )}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <RenderSections
            sections={sectionsRedux}
            addLecture={addLecture}
            addSection={addSection}
            editSection={editSection}
            deleteLecture={deleteLecture}
            deleteSection={deleteSection}
            handleSelectSection={handleSelectSection}
            errorMessage={values.errorMessage}
            taxPercentage={taxPercentage}
            serviceFees={serviceFees}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
