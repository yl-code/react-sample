import React from "react";
// import { HookDemo } from "./HookDemo";
import { CustomHookDemo } from "./custom-hook-demo/CustomHookDemo";
import { UseCallbackDemo, UseMemoDemo } from "./hook-api-demo";
import { CreatePortalDemo } from "./create-portal-demo/CreatePortalDemo";
import { HOCDemo } from "./HOC-demo/HOCDemo";
import { CreateFormDemo } from "./rc-form-demo/CreateFormDemo";
import { MyCreateFormDemo } from "./rc-form-demo";

export function AdvanceDemo() {
  return (
    <div>
      {/* <HookDemo></HookDemo> */}

      {/* <CustomHookDemo></CustomHookDemo> */}

      {/* <UseMemoDemo></UseMemoDemo> */}
      {/* <UseCallbackDemo></UseCallbackDemo> */}

      {/* <CreatePortalDemo></CreatePortalDemo> */}

      {/* <HOCDemo></HOCDemo> */}

      {/* <CreateFormDemo></CreateFormDemo> */}
      <MyCreateFormDemo></MyCreateFormDemo>
    </div>
  );
}
