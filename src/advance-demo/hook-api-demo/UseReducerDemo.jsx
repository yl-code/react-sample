import React, { useReducer } from "react";

const countReducer = (state = 1, action) => {
  const { type, payload = 1 } = action;

  switch (type) {
    case "ADD":
      return state + payload;

    default:
      return state;
  }
};

// 传给 useReducer 的初始值，是经过其他函数计算过的
const calcInitVal = () => {
  // ... some calculate
  return { data: 111 };
};

// 转换 useReducer 的第二个参数为我们需要的值
const initFn = (initVal) => {
  return initVal.data;
};

/**
 * 这里为啥不用 useState?
 *
 * 因为修改 count 的逻辑可以是可以复用的
 * 所以使用 useReducer 可以将修改 count 的这部分逻辑抽离出来，其他地方也能复用
 *
 * useReducer 就是 useState 的替代方案，如果有上面说的复用需求，可以考虑使用 useReducer
 */
export function UseReducerDemo() {
  const [count, dispatch] = useReducer(countReducer, calcInitVal(), initFn);

  return (
    <div>
      <h2>UseReducerDemo</h2>
      <button onClick={() => dispatch({ type: "ADD" })}>{count}</button>
    </div>
  );
}
