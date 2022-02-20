import React, { useCallback, useContext, useEffect } from "react";
import { RouterContext } from "./RouterContext";

/**
 * Redirect 是一个组件，因此我们不能直接使用 history.push 进行跳转
 *
 * 这里 Redirect 组件返回另一个组件 LifeCycle，当 LifeCycle 组件挂载完成时，再进行跳转
 *
 * push 为 true 时，进行 history.push 操作，否则进行 history.replace 操作
 *
 */
export function Redirect({ to, push = false }) {
  const { history } = useContext(RouterContext);

  const onMount = useCallback(() => {
    push ? history.push(to) : history.replace(to);
  }, [history, to, push]);

  return <LifeCycle onMount={onMount} />;
}

const LifeCycle = (props) => {
  useEffect(() => {
    props.onMount();
  }, []);

  return null;
};
