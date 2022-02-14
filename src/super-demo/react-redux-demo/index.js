import React from "react";
import { Provider } from "react-redux";
import { ReactReduxHookPage } from "./react-redux-page/ReactReduxHookPage";
import { ReactReduxPage } from "./react-redux-page/ReactReduxPage";
import { store } from "./react-redux-page/store";

export function ReactReduxDemo() {
  return (
    <Provider store={store}>
      <ReactReduxPage ownProps={"ownProps"} />
      <hr />
      <ReactReduxHookPage ownProps={"ownProps"} />
    </Provider>
  );
}
