import React, { Component } from "react";
import { store } from "./store";

export class ClassAddDemo extends Component {
  componentDidMount() {
    // 订阅更新
    store.subscribe(() => {
      console.log("subscribe state change");
      this.forceUpdate();
    });
  }

  add = () => store.dispatch({ type: "ADD" });

  render() {
    console.log(store);

    return (
      <div>
        <button onClick={this.add}>ADD {store.getState()}</button>
      </div>
    );
  }
}
