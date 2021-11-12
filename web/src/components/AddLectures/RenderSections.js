import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "components/Table/Table.js";
import {
  secondaryColor,
  primaryColor,
  dangerColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react";
import InputWithLabel from "components/TextInputs/InputWithLabel/InputWithLabel.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core";
import renderSectionsStyle from "./renderSectionsStyle";
import DeleteIcon from "@material-ui/icons/Delete";
import Check from "@material-ui/icons/Check";
import AddCircleIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomModal from "components/CustomModal/CustomModal.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import strings from "constants/strings";
import { translateNumber } from "utils";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(renderSectionsStyle);

export default function RenderSections(props) {
  const classes = useStyles();

  const lang = useSelector((state) => state.lang);

  const lastSectionId = props.sections.reduce(function (prev, current) {
    return prev.id > current.id || !current.id ? prev : current;
  }); //returns object

  return props.sections.length === 0 ? (
    <GridContainer justify="center" className={classes.noSections}>
      <GridItem
        xs={12}
        sm={12}
        md={10}
        className={classes.buttonMargin + " " + classes.newSection}
      >
        <Button
          onClick={props.addSection(0)}
          color="white"
          round
          className={classes.newSectionButton}
        >
          <AddCircleIcon className={classes.addIcon} />
          {strings.newSection[lang]}
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={10} className={classes.newSection}>
        <FormHelperText
          id="component-error-text"
          className={classes.buttonError}
        >
          {props.errorMessage}
        </FormHelperText>
      </GridItem>
    </GridContainer>
  ) : (
    props.sections.map((section, sectionIndex) => {
      let lecturesData = [];
      // <InputWithLabel
      //     formControlProps={{
      //       // fullWidth: true,
      //       // className: classes.customFormControlClasses,
      //     }}
      //     value={lecture.title}
      //     formControlStyle={classes.formControl}
      //     inputStyle={classes.input}
      //     // valid={values.lectureName.isValid}
      //     // errorMessage={
      //     //   values.lectureName.error && values.lectureName.error[lang]
      //     // }
      //     // inputProps={{
      //     //   onChange: handleChange('lectureName'),
      //     // }}
      //   />
      section.lectures.forEach((lecture, index) => {
        lecturesData.push([
          <div key={index} style={{ width: 400 }}>
            {lecture.title}
          </div>,
          <span key={index}>
            {translateNumber(lecture.price.toString(), lang) +
              " " +
              strings.egp[lang]}
          </span>,
          <div>
            <span key={index}>
              {translateNumber(
                Number(
                  Number(lecture.price * (1 + props.taxPercentage / 100)) +
                    Number(props.serviceFees)
                )
                  .toFixed(2)
                  .toString(),
                lang
              ) +
                " " +
                strings.egp[lang]}
            </span>
            <span key={index}>
              {translateNumber(
                strings.taxesAndService(props.taxPercentage, props.serviceFees)[
                  lang
                ],
                lang
              )}
              {/* {` (${props.taxPercentage}% ${"taxes"} + ${
                props.serviceFees
              } ${"EGP service"})`} */}
            </span>
          </div>,
          lecture.id ? (
            <div>
              <Tooltip
                id="edit-lecture"
                title={strings.editLecture[lang]}
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  key={index}
                  onClick={props.addLecture(
                    sectionIndex,
                    index,
                    "edit",
                    lecture.title,
                    lecture.price
                  )}
                  color="warning"
                  round
                  justIcon
                  size="sm"
                  className={classes.editLectureButton}
                >
                  <EditIcon style={{ color: "white" }} />
                </Button>
              </Tooltip>
            </div>
          ) : (
            <div>
              <Tooltip
                id="add-new-lecture"
                title={strings.addLecture[lang]}
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  key={index}
                  onClick={props.addLecture(sectionIndex, index + 1)}
                  color="primary"
                  round
                  justIcon
                  size="sm"
                  className={classes.addLectureButton}
                >
                  <AddCircleIcon style={{ color: "white" }} />
                </Button>
              </Tooltip>
              <Tooltip
                id="delete-lecture"
                title={strings.deleteLecture[lang]}
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  key={index}
                  onClick={props.deleteLecture(sectionIndex, index)}
                  color="danger"
                  round
                  justIcon
                  size="sm"
                  className={classes.addLectureButton}
                >
                  <DeleteIcon style={{ color: "white" }} />
                </Button>
              </Tooltip>
              <Tooltip
                id="edit-lecture"
                title={strings.editLecture[lang]}
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  key={index}
                  onClick={props.addLecture(
                    sectionIndex,
                    index,
                    "edit",
                    lecture.title,
                    lecture.price
                  )}
                  color="warning"
                  round
                  justIcon
                  size="sm"
                  className={classes.editLectureButton}
                >
                  <EditIcon style={{ color: "white" }} />
                </Button>
              </Tooltip>
            </div>
          ),
        ]);
      });

      return (
        <div key={sectionIndex}>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={12}
              style={{
                backgroundColor: secondaryColor[1],
                padding: "20px",
              }}
            >
              <GridContainer
                justify="center"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.payBySection}
                >
                  {/* {strings.payBySection[lang]}
                  <Checkbox
                    onClick={props.handleSelectSection(sectionIndex)}
                    checked={section.payBySection ? true : false}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  /> */}
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.sectionTitle}
                >
                  <div>{section.title}</div>
                </GridItem>
                {section.id ? (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.sectionButton}
                  >
                    <Tooltip
                      id="edit-section"
                      title={strings.editSection[lang]}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        key={sectionIndex}
                        onClick={props.editSection(sectionIndex)}
                        color="warning"
                        round
                        justIcon
                        size="sm"
                        className={classes.editLectureButton}
                      >
                        <EditIcon style={{ color: "white" }} />
                      </Button>
                    </Tooltip>
                  </GridItem>
                ) : (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.sectionButton}
                  >
                    <Tooltip
                      id="delete-lecture"
                      title={strings.deleteSection[lang]}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        key={sectionIndex}
                        onClick={props.deleteSection(sectionIndex)}
                        color="danger"
                        round
                        justIcon
                        size="sm"
                        className={classes.addLectureButton}
                      >
                        <DeleteIcon style={{ color: "white" }} />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="edit-section"
                      title={strings.editSection[lang]}
                      placement="right"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        key={sectionIndex}
                        onClick={props.editSection(sectionIndex)}
                        color="warning"
                        round
                        justIcon
                        size="sm"
                        className={classes.editLectureButton}
                      >
                        <EditIcon style={{ color: "white" }} />
                      </Button>
                    </Tooltip>
                    {/* <Button
                      onClick={props.deleteSection(sectionIndex)}
                      color='danger'
                      round
                      className={classes.deleteSection}>
                      <DeleteIcon className={classes.deleteIcon} />
                      {strings.deleteSection[lang]}
                    </Button> */}
                  </GridItem>
                )}
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHead={[
                      strings.lectureName[lang],
                      strings.price[lang],
                      strings.finalPrice[lang],
                      " ",
                    ]}
                    tableData={lecturesData}
                    tableHeaderColor="secondary"
                    round
                    noDataMessage={""}
                  />
                </GridItem>
              </GridContainer>
              {lecturesData.length == 0 || lastSectionId.id == section.id ? (
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={
                      classes.buttonMargin + " " + classes.deleteLectureCenter
                    }
                  >
                    <Button
                      onClick={props.addLecture(
                        sectionIndex,
                        lastSectionId.id == section.id
                          ? section.lectures.length
                          : 0
                      )}
                      color="white"
                      round
                      className={classes.addNewLecture}
                    >
                      <AddCircleIcon className={classes.addCircleIcon} />
                      {strings.addNewLecture[lang]}
                    </Button>
                  </GridItem>
                </GridContainer>
              ) : null}
            </GridItem>
          </GridContainer>
          {section.id && sectionIndex + 1 != props.sections.length ? null : (
            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={10}
                className={classes.buttonMargin + " " + classes.newSection}
              >
                <Button
                  onClick={props.addSection(sectionIndex + 1)}
                  color="white"
                  round
                  className={classes.newSectionButton}
                >
                  <AddCircleIcon className={classes.addIcon} />
                  {strings.newSection[lang]}
                </Button>
              </GridItem>
            </GridContainer>
          )}
        </div>
      );
    })
  );
}
