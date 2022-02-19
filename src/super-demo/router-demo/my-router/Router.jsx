import React, { Component } from "react";
import { RouterContext } from "./RouterContext";

export class Router extends Component {
  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/",
      defaultMatch: true,
    };
  }

  constructor(props) {
    super(props);

    this.state = { location: props.history.location };

    //监听路由变化
    this.unListen = props.history.listen((location) =>
      this.setState({ location })
    );
  }

  // 有监听就会有取消监听
  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const { history, children } = this.props;
    const { location } = this.state;

    return (
      <RouterContext.Provider
        value={{
          history,
          location,

          // 设置一个默认的 match
          // 如：404 页面组件就没有 path 属性，Route 组件执行 matchPath 进行路由匹配时会一直返回 null，以至于不被渲染
          match: Router.computeRootMatch(location.pathname),
        }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}
