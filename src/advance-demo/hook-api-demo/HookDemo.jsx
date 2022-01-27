import React, { useEffect, useState } from "react";

export function HookDemo() {
  const [num, setNum] = useState(1);
  const [date, setDate] = useState(new Date());

  // 此时 useEffect 的回掉函数只会在组件挂载时执行一次，后续组件更新则不会执行
  // 类似 didMount
  useEffect(() => {
    console.log("date effect");

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // 该回掉函数的返回值也是一个函数，用来执行清除副作用
    // 类似 willUnmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 此时 useEffect 的回掉函数在 组件挂载时 和 num 更新时都会执行
  // 类似 didMount、updateMount
  useEffect(() => {
    console.log("num effect");

    document.title = `click ${num} times`;
  }, [num]);

  return (
    <div>
      <h2>{date.toLocaleString()}</h2>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        num: {num}
      </button>
    </div>
  );
}
