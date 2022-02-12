// redux
// import { applyMiddleware, combineReducers, createStore } from "redux";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import promise from "redux-promise";

// my-redux
import {
  createStore,
  applyMiddleware,
  combineReducers,
  logger,
  thunk,
  promise,
  promiseFull,
} from "../my-redux";

const countReducer = (state = 100, action) => {
  const { type, payload = 1 } = action;

  switch (type) {
    case "ADD":
      return state + payload;
    default:
      return state;
  }
};

const countReducer2 = (state = { num: 1 }, action) => {
  const { type, payload = 1 } = action;

  switch (type) {
    case "ADD2":
      return { ...state, num: state.num + payload };
    default:
      return state;
  }
};

export const store = createStore(
  countReducer,

  // 合并多个 reducer
  // combineReducers({
  //   count: countReducer,
  //   count2: countReducer2,
  // }),
  applyMiddleware(promise, thunk, logger)
);
