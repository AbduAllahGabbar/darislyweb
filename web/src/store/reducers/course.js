import {
  PRELIMINARY_INFO,
  EDIT_SECTIONS,
  EDIT_GROUPS,
  RESET_COURSE,
  FETCH_COURSE_DATA_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  description: null,
  subjectId: null,
  education: null,
  grade: null,
  sections: [],
  groups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRELIMINARY_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_SECTIONS:
      return {
        ...state,
        sections: action.sections,
      };
    case EDIT_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    case RESET_COURSE:
      return {
        ...initialState,
        sections: [],
      };
    case FETCH_COURSE_DATA_SUCCESS:
      return {
        ...action.courseData,
      };
    default:
      return state;
  }
};
