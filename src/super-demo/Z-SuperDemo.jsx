import React from "react";
import {} from "./antd-demo";
import {
  ClassAntdFormPage,
  FuncAntdFormPage,
  ClassRCFieldFormPage,
  FuncRcFieldFormPage,
  ClassMyRCFormPage,
  FuncMyRCFormPage,
} from "./antd-demo";

import { ReduxPage } from "./redux-demo";

export function SuperDemo() {
  return (
    <div>
      {/* <ClassRCFieldFormPage />
      <FuncRcFieldFormPage /> */}

      {/* <hr />
      <ClassAntdFormPage />
      <FuncAntdFormPage /> */}

      {/* <hr />
      <FuncMyRCFormPage />
      <ClassMyRCFormPage /> */}

      <ReduxPage></ReduxPage>
    </div>
  );
}
