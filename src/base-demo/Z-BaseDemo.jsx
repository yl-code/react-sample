import React, { Component } from "react";
// import { Test } from "../test-demo/Test";
// import { JsxDemo } from "./JsxDemo";
// import { ClassComDemo } from "./ClassComDemo";
// import { FuncComDemo } from "./FuncComDemo";
// import { SetStateDemo } from "./SetStateDemo";
// import { UserPage, HomePage } from "./CompositionComDemo";
// import { ClassAddDemo, FuncMinusDemo } from "./redux-demo";
// import { RouterDemo } from "./router-demo";
// import { ProviderStoreDemo } from "./react-redux-demo";
// import { NotPure, PureComDemo } from "./pure-component-demo";
import { LifeCycleDemo } from "./life-cycle-demo/LifeCycleDemo";

export class BaseDome extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>React App</h1>
        <hr />

        {/* <Test></Test> */}

        {/* <JsxDemo></JsxDemo> */}

        {/* <ClassComDemo></ClassComDemo> */}

        {/* <FuncComDemo></FuncComDemo> */}

        {/* <SetStateDemo></SetStateDemo> */}

        {/* <UserPage></UserPage> */}
        {/* <HomePage></HomePage> */}

        {/* <FuncMinusDemo></FuncMinusDemo> */}
        {/* <ClassAddDemo></ClassAddDemo> */}

        {/* <RouterDemo></RouterDemo> */}

        {/* <ProviderStoreDemo></ProviderStoreDemo> */}

        {/* <NotPure></NotPure> */}
        {/* <PureComDemo></PureComDemo> */}

        <LifeCycleDemo></LifeCycleDemo>
      </div>
    );
  }
}
