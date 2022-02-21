import React from "react";
import ReactDom from "react-dom";
import "./index.css";

import { Test } from "./test-demo/Test";
import { BaseDome } from "./base-demo/Z-BaseDemo";
import { AdvanceDemo } from "./advance-demo/Z-AdvanceDemo";
import { SuperDemo } from "./super-demo/Z-SuperDemo";
import { ProjectDemo } from "./project-demo";

// ReactDom.render(<Test />, document.querySelector("#root"));
// ReactDom.render(<BaseDome />, document.querySelector("#root"));
// ReactDom.render(<AdvanceDemo />, document.querySelector("#root"));
// ReactDom.render(<SuperDemo />, document.querySelector("#root"));
ReactDom.render(<ProjectDemo />, document.querySelector("#root"));
