import React, { Component } from "react";
import PropTypes from "prop-types";

export class LifeCycleDemo extends Component {
  static defaultProps = {
    num: 1,
  };

  static propTypes = {
    num: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: 10,
    };

    console.log("1-constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2-getDerivedStateFromState", props, state);
    return state.count === 3 ? null : { derived: "derived" };
  }

  componentDidMount() {
    console.log("3-componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("a-shouldComponentUpdate");
    return true;
  }

  // 在更新 dom 前被调用
  // 可以用来记录一些更新前的 dom 信息，如滚动条的位置信息
  // 它的返回值，会传给 componentDidUpdate 的底单个参数
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("b-getSnapshotBeforeUpdate", prevState, this.state);
    return "form getSnapshotBeforeUpdate return";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("c-componentDidUpdate", snapshot);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render", this.state, this.props);

    const { count } = this.state;

    return (
      <div>
        LifeCycleDemo <br />
        <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          state.count: {count}
        </button>
      </div>
    );
  }
}
