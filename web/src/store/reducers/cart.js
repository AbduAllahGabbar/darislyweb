import {
  FETCH_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/actionTypes";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
