import React, { Component } from "react";
import { Provider } from "react-redux";
import { ReactReduxDemo } from "./ReactReduxDemo";
import { store } from "./store";

export class ProviderStoreDemo extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxDemo></ReactReduxDemo>
      </Provider>
    );
  }
}
