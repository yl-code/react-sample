import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import { BaseDome } from "./base-demo/Z-BaseDemo";
// import { AdvanceDemo } from "./advance-demo/Z-AdvanceDemo";
import { SuperDemo } from "./super-demo/Z-SuperDemo";

ReactDom.render(<BaseDome />, document.querySelector("#root"));
// ReactDom.render(<AdvanceDemo />, document.querySelector("#root"));
// ReactDom.render(<SuperDemo />, document.querySelector("#root"));
