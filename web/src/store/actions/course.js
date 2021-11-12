import { PRELIMINARY_INFO, EDIT_SECTIONS, EDIT_GROUPS, RESET_COURSE, FETCH_COURSE_DATA_SUCCESS } from "./actionTypes";
import api from "../../services/api";

export const setPreliminaryInfo = (preliminaryInfo) => async (dispatch, getState) => {

  let payload = { ...preliminaryInfo };

  await dispatch({ type: PRELIMINARY_INFO, payload });
};

export const editSections = (sections) => async (dispatch, getState) => {

  await dispatch({ type: EDIT_SECTIONS, sections });
};

export const editGroups = (groups) => async (dispatch, getState) => {

  await dispatch({ type: EDIT_GROUPS, groups });
};

export const createCourse = (course) => async (dispatch) => {
  try {
    const res = await api.createCourse(course);
    await dispatch({ type: RESET_COURSE });
    return true;
  }
  catch {
    return false;
  }
};

export const updateCourse = (courseId, course) => async (dispatch) => {
  try {
    const res = await api.updateCourse(courseId, course);
    await dispatch({ type: RESET_COURSE });
    return true;
  }
  catch {
    return false;
  }
};

export const resetCourse = () => async (dispatch) => {
  try {
    await dispatch({ type: RESET_COURSE });
    return true;
  }
  catch {
    return false;
  }
};

export const getCourseData = (courseId) => async (dispatch) => {
  try {
    const courseData = await api.getCourseData(courseId);
    await dispatch({ type: FETCH_COURSE_DATA_SUCCESS, courseData: courseData.data });
    return courseData.data;
  }
  catch {
    return false;
  }
};