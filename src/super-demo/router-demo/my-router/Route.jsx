import React, { Component, createElement } from "react";
import { RouterContext } from "./RouterContext";
import { matchPath } from "./utils";

export class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { children, component, render } = this.props;
          const { location } = context;
          // console.log(location);

          // matchPath 方法可以匹配并解析 pathname，匹配不到会返回 null，匹配到了就会返回 pathname 的解析结果对象
          // const match = location.pathname === path;
          const match = matchPath(location.pathname, this.props);
          // console.log(match);

          const props = { ...context, match };

          /**
           * 接收组件三种情况的优先级：children > component > render
           *
           * match：
           *    children、component、render、null
           *
           * not match:
           *    children<function>、null
           */
          return match
            ? children
              ? typeof children === "function"
                ? children(props)
                : children
              : component
              ? createElement(component, props)
              : render
              ? render(props)
              : null
            : typeof children === "function"
            ? children(props)
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
