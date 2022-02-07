import React, { Component } from "react";

export class Field extends Component {
  // 1、将接收的组件变为受控组件
  getControlled = () => ({
    value: "",
    onChange(e) {
      const newVal = e.target.value;

      console.log("newVal", newVal);
    },
  });

  render() {
    const controlledChild = React.cloneElement(
      this.props.children,
      this.getControlled()
    );
    return controlledChild;
  }
}
