import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import langReducer from "./reducers/language";
import authReducer from "./reducers/auth";
import courseReducer from "./reducers/course";
import cartReducer from "./reducers/cart";
const rootReducer = combineReducers({
  lang: langReducer,
  auth: authReducer,
  course: courseReducer,
  cart: cartReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};
export default configureStore;
