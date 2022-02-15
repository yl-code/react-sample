import React, { useState, useEffect, useLayoutEffect } from "react";

function Demo() {
  useLayoutEffect(() => {
    // 在所有的 DOM 变更之后同步调用 effect
    console.log("useLayoutEffect exec ComMount");

    return () => {
      console.log("useLayoutEffect exec ComWillUnMount");
    };
  }, []);

  useEffect(() => {
    // 在组件渲染到屏幕之后延迟执行 effect
    // 可以使用它来读取 DOM 布局并同步触发重渲染
    // 在浏览器执行绘制之前， useLayoutEffect 内部的更新计划将被同步刷新
    // 尽可能使用标准的 useEffect 以避免阻塞视觉更新
    console.log("useEffect exec ComMount");

    return () => {
      console.log("useEffect exec ComWillUnMount");
    };
  }, []);

  return <div>useLayoutEffect 与 useEffect 有什么区别</div>;
}

export function UseLayoutEffectDemo() {
  const [num, setNum] = useState(1);

  return (
    <div>
      <h2>UseLayoutEffectDemo</h2>
      {num % 2 !== 0 && <Demo />}
      <hr />
      <button onClick={() => setNum(num + 1)}>add num: {num}</button>
    </div>
  );
}
