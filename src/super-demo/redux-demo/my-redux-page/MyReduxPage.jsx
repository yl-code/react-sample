import React, { Component } from 'react';
import { store } from './store';

export class MyReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleAdd = () => store.dispatch({ type: 'ADD', payload: 100 });

  handleAsyncAdd = () => {
    // // 用 setTimeout 模拟 ajax 请求
    // // 1、直接在组件中写 ajax 请求非常不优雅
    // setTimeout(() => {
    //   store.dispatch({ type: "ADD", payload: 100 });
    // }, 1000);

    // 2、将数据请求函数抽出去，让 store.dispatch 直接调用，这样就可以将数据请求与视图渲染分离开
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'ADD', payload: 100 });
      }, 1000);
    });
  };

  handlePromiseAdd = () => {
    store.dispatch({
      type: 'ADD',
      payload: Promise.resolve(100),
    });
  };

  setNum = () => {
    store.dispatch({ type: 'ADD2', payload: 10 });
  };

  render() {
    // console.log(store.getState());

    return (
      <div>
        <h2>my-redux-demo</h2>
        <button onClick={this.handleAdd}>ADD：{store.getState()}</button>
        <br />
        <button onClick={this.handleAsyncAdd}>
          async-ADD：{store.getState()}
        </button>
        <br />
        <button onClick={this.handlePromiseAdd}>
          promise-ADD：{store.getState()}
        </button>

        <br />

        {/* 下面是 combineReducers 的例子 */}
        {/* <button onClick={this.handleAdd}>ADD：{store.getState().count}</button>
        <button onClick={this.setNum}>
          ADD2：{store.getState().count2.num}
        </button> */}
      </div>
    );
  }
}

// const f1 = (arg) => {
//   console.log('f1', arg);
//   return arg;
// };
// const f2 = (arg) => {
//   console.log('f2', arg);
//   return arg;
// };
// const f3 = (arg) => {
//   console.log('f3', arg);
//   return arg;
// };

// const compose = (...func) => {
//   if (!func.length) return (arg) => arg;

//   if (func.length === 1) return func[0];

//   return func.reduce(
//     (a, b) =>
//       (...arg) =>
//         a(b(...arg))
//   );
// };
// console.log(compose(f1)('omg'));
// console.log(compose(f1, f2, f3)('omg')); // f1(f2(f3(...arg)))
