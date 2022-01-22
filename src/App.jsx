import React, { Component } from "react";
import { Test } from "./test-demo/Test";
// import { JsxDemo } from "./base-demo/JsxDemo";
// import { ClassComDemo } from "./base-demo/ClassComDemo";
// import { FuncComDemo } from "./base-demo/FuncComDemo";
// import { SetStateDemo } from "./base-demo/SetStateDemo";
// import { UserPage, HomePage } from "./base-demo/CompositionComDemo";
// import { ClassAddDemo, FuncMinusDemo } from "./redux-demo";
import { RouterDemo } from "./router-demo";
export class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>React App</h1>
        <hr />

        <Test></Test>

        {/* <JsxDemo></JsxDemo> */}

        {/* <ClassComDemo></ClassComDemo> */}

        {/* <FuncComDemo></FuncComDemo> */}

        {/* <SetStateDemo></SetStateDemo> */}

        {/* <UserPage></UserPage> */}
        {/* <HomePage></HomePage> */}

        {/* <FuncMinusDemo></FuncMinusDemo> */}
        {/* <ClassAddDemo></ClassAddDemo> */}

        <RouterDemo></RouterDemo>
      </div>
    );
  }
}
