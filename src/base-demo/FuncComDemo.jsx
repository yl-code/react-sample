/**
 * 用函数组件，完成 clock demo
 *
 */

import React, { useState, useEffect } from "react";

export function FuncComDemo() {
  const [clock, setClock] = useState(Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  console.log(clock);

  return <div>{clock.toString()}</div>;
}
