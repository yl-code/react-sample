import React, { Component } from "react";
import { JsxDemo } from "./base-demo/JsxDemo";

export class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>App</h1>

        <JsxDemo></JsxDemo>
      </div>
    );
  }
}
