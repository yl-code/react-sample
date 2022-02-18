import React, { Component, createElement } from "react";
import { RouterContext } from "./RouterContext";

export class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { path, component } = this.props;
          const { location } = context;

          const match = location.pathname === path;
          return match ? createElement(component) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
