import React, { Component } from "react";
import { RouterContext } from "./RouterContext";
import { matchPath } from "./utils";

export class Switch extends Component {
  render() {
    const { children } = this.props;

    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          let match = null; // 匹配结果
          let element = null; // 匹配到的元素

          // 循环 Switch 的子组件
          React.Children.forEach(children, (child) => {
            //
            // match 匹配到结果之后，不会再走下面的逻辑
            if (match === null && React.isValidElement(child)) {
              match = child.props.path
                ? matchPath(location.pathname, child.props)
                : context.match;

              element = child;
            }
          });

          return match
            ? React.cloneElement(element, { switchMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
