import { SET_LANGUAGE } from "../actions/actionTypes";
const initialState = "ar";
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
};
export default reducer;
