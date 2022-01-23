import React, { Component } from "react";

export class NotPure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
    };
  }

  setNum = () => {
    this.setState({ num: 100 });
  };

  // 性能优化
  // 当 state 的值没有改变时，阻止组件重新 render
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.num !== nextState.num;
  }

  render() {
    console.log("render");

    const { num } = this.state;

    return (
      <div>
        <button onClick={this.setNum}>num: {num}</button>
      </div>
    );
  }
}
