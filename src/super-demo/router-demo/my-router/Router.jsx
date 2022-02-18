import React, { Component } from "react";
import { RouterContext } from "./RouterContext";

export class Router extends Component {
  constructor(props) {
    super(props);

    this.state = { location: props.history.location };

    //监听路由变化
    props.history.listen((location) => this.setState({ location }));
  }

  render() {
    const { history, children } = this.props;

    return (
      <RouterContext.Provider
        value={{ history, location: this.state.location }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}
