/**
 * 函数组件如何重新触发渲染？
 * todo
 */

import React from "react";
import { store } from "./store";

export function FuncMinusDemo() {
  const minus = () => store.dispatch({ type: "MINUS" });

  return (
    <div>
      <button onClick={minus}>MINUS {store.getState()}</button>
    </div>
  );
}
