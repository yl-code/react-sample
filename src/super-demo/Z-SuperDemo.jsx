import React from "react";
import { ClassAntdFormPage, FuncAntdFormPage } from "./antd-demo/AntdFormPage";
import { ClassMyRCFormPage, FuncMyRCFormPage } from "./antd-demo/My-FormPage";
import {
  ClassRCFieldFormPage,
  FuncRcFieldFormPage,
} from "./antd-demo/RCFieldFormPage";

export function SuperDemo() {
  return (
    <div>
      <FuncMyRCFormPage />
      {/* <ClassMyRCFormPage /> */}

      {/* <hr />

      <ClassRCFieldFormPage />
      <FuncRcFieldFormPage /> */}

      {/* <hr />

      <ClassAntdFormPage />
      <FuncAntdFormPage /> */}
    </div>
  );
}
