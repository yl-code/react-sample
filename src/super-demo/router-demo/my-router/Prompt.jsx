import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { RouterContext } from "./RouterContext";

export function Prompt({ when = true, message = "" }) {
  const context = useContext(RouterContext);

  // let action = useCallback(() => {
  //   return history.block(message);
  // }, [history, message]);

  const method = context.history.block;

  if (!when) return null;

  // 这里有问题 !!!
  // function 组件和 class 组件展现的效果不一样
  //
  // 后面可以用真实的 Prompt 组件搭配 getUserConfirmation 函数试验一下
  // getUserConfirmation 默认使用的是 window.confirm
  //
  // return (
  //   <LifeCycleClass
  //     onMount={(self) => {
  //       self.release = method(message);
  //     }}
  //     onUnmount={(self) => {
  //       self.release();
  //     }}
  //   />
  // );

  return <LifeCycleFunc onMount={() => method(message)} />;
}

export class LifeCycleClass extends Component {
  componentDidMount() {
    console.log("LifeCycleClass mount");

    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }

  componentWillUnmount() {
    console.log("LifeCycleClass unMount");

    if (this.props.onUnmount) {
      this.props.onUnmount.call(this, this);
    }
  }

  render() {
    return null;
  }
}

const LifeCycleFunc = ({ onMount }) => {
  // useEffect(() => {
  //   return onMount();
  // }, []);

  // 这种写法与 LifeCycleClass 表现的问题 🐛🐛🐛 一样
  useLayoutEffect(() => {
    return onMount();
  }, [onMount]);

  return null;
};
