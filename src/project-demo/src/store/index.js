import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./loginReducer";

export const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(thunk)
);
