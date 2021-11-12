import { FETCH_CART_ITEMS, ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";
import api from "../../services/api";

export const getCartItems = () => async (dispatch) => {
  const items = (await api.getCartItems()).data;
  await dispatch({ type: FETCH_CART_ITEMS, payload: { items } });
};

export const addToCart = (productIds) => async (dispatch) => {
  const items = (await api.addToCart(productIds)).data;
  await dispatch({ type: ADD_TO_CART, payload: { items } });
};

export const removeFromCart = (id) => async (dispatch) => {
  await api.removeFromCart(id);
  await dispatch({ type: REMOVE_FROM_CART, payload: { id } });
};
