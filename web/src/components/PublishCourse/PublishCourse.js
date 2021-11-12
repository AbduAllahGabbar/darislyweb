import React from "react";
import CourseBuilderPreliminaryInfo from "components/CourseBuilderPreliminaryInfo/CourseBuilderPreliminaryInfo";
import AddCourseGroups from "components/AddCourseGroups/AddCourseGroups";
import AddLectures from "components/AddLectures/AddLectures";
import NextBackStepper from "components/NextBackStepper/NextBackStepper";

export default function PublishCourse(props) {
  const handleNext = (step) => {

    console.log("test");
    props.handleNext(step);
  }
  return (

    <div>
      <NextBackStepper
        handleNext={handleNext}
        handleBack={props.handleBack}
        publish
      />
      <CourseBuilderPreliminaryInfo publish />
      <AddLectures publish />
      <AddCourseGroups publish />
    </div>
  );
}
