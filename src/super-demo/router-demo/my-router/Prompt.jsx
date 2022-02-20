import React, { Component, useCallback, useContext, useEffect } from "react";
import { RouterContext } from "./RouterContext";

export function Prompt({ when = true, message = "" }) {
  const { history } = useContext(RouterContext);

  let action = useCallback(() => {
    return history.block(message);
  }, [history, message]);

  if (!when) return null;

  // 这里有问题 !!!
  // function 组件和 class 组件展现的效果不一样
  //
  // 后面可以用真实的 Prompt 组件搭配 getUserConfirmation 函数试验一下
  // getUserConfirmation 默认使用的是 window.confirm
  //
  return (
    <LifeCycleClass
      onMount={(self) => {
        self.release = action();
      }}
      onUnMount={(self) => {
        self.release();
      }}
    />
  );

  // return <LifeCycleFunc onMount={action} />;
}

export class LifeCycleClass extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount.call(this, this);
  }

  componentWillUnmount() {
    this.props.onUnMount && this.props.onUnMount.call(this, this);
  }

  render() {
    return null;
  }
}

const LifeCycleFunc = ({ onMount }) => {
  useEffect(() => {
    return onMount();
  }, [onMount]);

  return null;
};
