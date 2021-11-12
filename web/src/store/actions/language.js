import { SET_LANGUAGE } from "./actionTypes";
import api from "../../services/api";

export const setLanguage = (lang) => async (dispatch, getState) => {
  dispatch({
    type: SET_LANGUAGE,
    lang,
  });

  if (getState().auth) {
    await api.setLanguage(lang);
  }
};
