import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const countReducer = (state = 100, action) => {
  const { type, payload = 1 } = action;

  switch (type) {
    case "ADD":
      return state + payload;
    default:
      return state;
  }
};

export const store = createStore(countReducer, applyMiddleware(logger, thunk));
