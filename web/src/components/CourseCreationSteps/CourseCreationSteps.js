import React from "react";
import CourseCreationStepsStyle from "./CourseCreationStepsStyle";
import { makeStyles } from "@material-ui/core";
import "./CourseCreationSteps.css";
const useStyles = makeStyles(CourseCreationStepsStyle);

export default function CourseCreationSteps(props) {
  const steps = ["Description", "Curriculum", "Schedule", "Publish"];

  return (
    <div className="progress">
      {steps.slice(0, steps.length - 1).map((step, idx) => (
        <React.Fragment>
          <div
            style={props.activeStep > idx ? { cursor: "pointer" } : null}
            onClick={() => {
              props.setActiveStep(idx);
            }}
            className={`circle${props.activeStep >= idx ? " active" : ""}`}
          >
            <span className="label">{idx + 1}</span>
            <span className="title">{step}</span>
          </div>
          <span className="bar"></span>
        </React.Fragment>
      ))}
      <div
        className={`circle${
          props.activeStep == steps.length - 1 ? " active" : ""
        }`}
        
      >
        <span className="label">{steps.length}</span>
        <span className="title">{steps[steps.length - 1]}</span>
      </div>
    </div>
  );
}
