import React, { useMemo, useState } from "react";

export function UseMemoDemo() {
  const [num, setNum] = useState(0);
  const [val, setVal] = useState("");

  // 这个即时函数会根据 num 计算出另一个值
  // 每次组件更新都会重新计算一次
  // 但是并不是每次组件更新都是因为 num 的值发生改变所造成的
  // 所以会造成计算浪费
  const expensive = (() => {
    console.log("expensive computed");

    let count = 0;
    for (let i = 0; i < num; i++) {
      count += i;
    }
    return count;
  })();

  // 此时可以使用 useMemo
  // 类似于缓存了计算值，只有当依赖数据发生改变时，才重新计算
  const memoExpensive = useMemo(() => {
    console.log("memo expensive computed");

    let count = 0;
    for (let i = 0; i < num; i++) {
      count += i;
    }
    return count;
  }, [num]);

  return (
    <div>
      <h2>expensive: {expensive}</h2>
      <h2>memoExpensive: {memoExpensive}</h2>
      <button onClick={() => setNum(num + 1)}>num: {num}</button>

      <hr />

      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
}
