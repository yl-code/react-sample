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
           *
           *
           *
           * 为了支持 hooks 用法 useRouteMatch，这里需要再用 RouterContext.Provider 包一层
           *
           * 如果不使用 Provider 再包一层，useRouteMatch 里面使用的 useContext 拿到的，就一直是最顶层 RouterContext.Provider 提供的 context
           * 并且 context 中的 match 对象只是初始设置的默认值
           *
           * 这样包了一层 Provider 之后，后代组件中，使用 useRouteMatch 就能拿到最新的，真实的 match 对象了
           */
          return (
            <RouterContext.Provider value={props}>
              {match
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
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
