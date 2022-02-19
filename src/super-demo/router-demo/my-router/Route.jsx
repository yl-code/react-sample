import React, { Component, createElement } from "react";
import { RouterContext } from "./RouterContext";
import { matchPath } from "./utils";

export class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { children, component, render, path, switchMatch } = this.props;
          const { location } = context;
          // console.log(location);

          // 简版路由匹配
          // const match = location.pathname === path;
          //
          // 完整版路由匹配，
          // matchPath 方法可以匹配并解析 pathname，匹配不到会返回 null，匹配到了就会返回 pathname 的解析结果对象
          // 如果没有 path 属性，那就说明是 404 的页面组件，那么此时的 match 就等于 Router 组件设置的默认 match
          //
          // switchMatch 是 Switch 组件的路由匹配结果
          //
          const match = switchMatch
            ? switchMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match;
          console.log(match);

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
