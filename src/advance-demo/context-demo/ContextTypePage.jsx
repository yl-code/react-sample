import React, { Component } from "react";
import { ThemeContext, UserContext } from "./Context";

export class ContextTypePage extends Component {
  /**
   * contextType 这种写法只能用在 class 组件中
   * 并且只能接收一个 context
   */
  // static contextType = UserContext;
  static contextType = ThemeContext;

  render() {
    const { color } = this.context;

    return <h2 style={{ color }}>ContextTypePage: {color}</h2>;
  }
}
