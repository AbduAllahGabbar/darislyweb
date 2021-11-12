import { FETCH_USER } from "./actionTypes";
import { setLanguage } from "./language";
import api from "../../services/api";

export const signInStudent = (signInInfo) => async (dispatch, getState) => {
  const res = await api.signInStudent(signInInfo, getState().lang);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signInTutor = (signInInfo) => async (dispatch, getState) => {
  const res = await api.signInTutor(signInInfo, getState().lang);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signInStaff = (signInInfo) => async (dispatch, getState) => {
  const res = await api.signInStaff(signInInfo, getState().lang);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signUpStudent = (signUpInfo) => async (dispatch, getState) => {
  const res = await api.signUpStudent(signUpInfo, getState().lang);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUser = () => async (dispatch) => {
  const res = await api.fetchUser();
  if (res.data?.lang) dispatch(setLanguage(res.data.lang));
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const verifyPhone = (code) => async (dispatch, getState) => {
  await api.verifyPhone(code);

  let payload = { ...getState().auth, phoneVerified: 1 };

  await dispatch({ type: FETCH_USER, payload });
};
