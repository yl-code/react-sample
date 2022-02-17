import React from "react";
import { ReactReduxHookPage } from "./react-redux-page/ReactReduxHookPage";
import { ReactReduxPage } from "./react-redux-page/ReactReduxPage";
import { store } from "./react-redux-page/store";

// import { Provider } from "react-redux";
import { Provider } from "./react-redux-page/my-react-redux";

export function ReactReduxDemo() {
  return (
    <Provider store={store}>
      <ReactReduxPage ownProps={"ownProps"} />
      <hr />
      <ReactReduxHookPage ownProps={"ownProps"} />
    </Provider>
  );
}
