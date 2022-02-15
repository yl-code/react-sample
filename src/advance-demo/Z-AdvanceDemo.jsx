import React from "react";
import { CustomHookDemo } from "./custom-hook-demo/CustomHookDemo";
import {
  UseCallbackDemo,
  UseMemoDemo,
  HookDemo,
  UseReducerDemo,
  UseLayoutEffectDemo,
} from "./hook-api-demo";
import { CreatePortalDemo } from "./create-portal-demo/CreatePortalDemo";
import { HOCDemo } from "./HOC-demo/HOCDemo";
import { CreateFormDemo, MyCreateFormDemo } from "./rc-form-demo";
import { ContextDemo } from "./context-demo/ContextDemo";

export function AdvanceDemo() {
  return (
    <div>
      {/* <HookDemo /> */}

      {/* <CustomHookDemo /> */}

      {/* <UseMemoDemo /> */}
      {/* <UseCallbackDemo /> */}
      {/* <UseReducerDemo /> */}
      <UseLayoutEffectDemo />

      {/* <CreatePortalDemo /> */}

      {/* <HOCDemo /> */}

      {/* <CreateFormDemo /> */}
      {/* <MyCreateFormDemo /> */}

      {/* <ContextDemo /> */}
    </div>
  );
}
