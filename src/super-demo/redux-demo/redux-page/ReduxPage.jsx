import React, { Component } from "react";
import { store } from "./store";

export class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  handleAdd = () => store.dispatch({ type: "ADD", payload: 100 });

  render() {
    return (
      <button onClick={this.handleAdd}>redux-demo: {store.getState()}</button>
    );
  }
}
