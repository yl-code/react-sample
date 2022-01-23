import React, { Component, PureComponent } from "react";

export class PureComDemo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      count: {
        val: 1,
      },
    };
  }

  setNum = () => {
    this.setState({ num: 100 });
  };

  // PureComponent
  // 内置了 shouldComponentUpdate
  // 它只能在 class 组件中使用
  // 它的比较是浅比较，就是只比较第一层的数据是否有变化
  // 较深层次的数据变化时是无法比较的，表现的现象就是 组件还是会更新

  // 所以在组件的 state 和 props 较简单时，可以使用 PureComponent 来减少不必要的组件更新，以提高组件性能
  setVal = () => {
    this.setState({ count: { val: 111 } });
  };

  // // 性能优化
  // // 当 state 的值没有改变时，阻止组件重新 render
  // shouldComponentUpdate(_nextProps, nextState) {
  //   return this.state.num !== nextState.num;
  // }

  render() {
    console.log("render");

    const { num, count } = this.state;

    return (
      <div>
        <button onClick={this.setNum}>num: {num}</button>

        <button onClick={this.setVal}>val: {count.val}</button>
      </div>
    );
  }
}
