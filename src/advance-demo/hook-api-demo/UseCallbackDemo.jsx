import React, { PureComponent, useCallback, useState } from "react";

export function UseCallbackDemo() {
  const [num, setNum] = useState(0);
  const [val, setVal] = useState("");

  // 这个函数的计算内容，会根据 num 的变化而发生改变
  // 它会在组件更新时被重新声明一次
  // 但是组件的更新并不都是由 num 变化所引起的
  // 重复声明函数会影响程序运行的性能
  const fn = () => {
    console.log("expensive computed");

    let count = 0;
    for (let i = 0; i < num; i++) {
      count += i;
    }
    return count;
  };

  // 所以这个时候可以使用 useCallback
  // 类似于将函数缓存起来
  // 只有当依赖发生改变时，才重新声明函数
  // 重新声明函数，意味着：函数的引用 memoFn 会发生改变
  const memoFn = useCallback(() => {
    console.log("expensive computed");

    let count = 0;
    for (let i = 0; i < num; i++) {
      count += i;
    }
    return count;
  }, [num]);

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>num: {num}</button>

      <hr />

      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />

      <hr />

      {/* <Child1 fn={fn}></Child1> */}
      {/* <Child2 fn={memoFn}></Child2> */}
      <Child3 fn={memoFn}></Child3>
    </div>
  );
}

/**
 * 这个 pure component 接受的 props 中的 fn 发生改变时，组件才会重新渲染
 */
class Child3 extends PureComponent {
  render() {
    const { fn } = this.props;
    console.log("child-3 render");

    return <div>child-3: {fn()}</div>;
  }
}

/**
 *
 * 下面两个函数组件不管怎么弄，都会重新渲染
 */

function Child1(props) {
  const { fn } = props;
  console.log("child-1 render");

  return <div>child-1: {fn()}</div>;
}

function Child2(props) {
  const { fn } = props;
  console.log("child-2 render");

  return <div>child-2: {fn()}</div>;
}
