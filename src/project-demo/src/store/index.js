import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./loginReducer";

export const store = createStore(combineReducers({ user: loginReducer }));
