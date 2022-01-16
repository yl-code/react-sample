import React, { Component } from "react";
// import { JsxDemo } from "./base-demo/JsxDemo";
// import { ClassComDemo } from "./base-demo/ClassComDemo";
// import { FuncComDemo } from "./base-demo/FuncComDemo";
import { SetStateDemo } from "./base-demo/SetStateDemo";

export class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>App</h1>

        {/* <JsxDemo></JsxDemo> */}

        {/* <ClassComDemo></ClassComDemo> */}

        {/* <FuncComDemo></FuncComDemo> */}

        <SetStateDemo></SetStateDemo>
      </div>
    );
  }
}
