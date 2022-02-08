import React, { Component } from "react";
import { FormContext } from "./FormContext";

export class Field extends Component {
  static contextType = FormContext;

  // 1、将接收的组件变为受控组件
  getControlled = () => {
    const { name } = this.props;
    const { setFieldValue, getFieldValue } = this.context;

    // console.log(this.context);

    return {
      value: getFieldValue(name),
      onChange(e) {
        const newVal = e.target.value;

        // console.log("newVal", newVal);

        setFieldValue(name, newVal);
      },
    };
  };

  // 2、数据改变时，更新组件
  onStoreChange = () => {
    this.forceUpdate();
  };

  // 3、在 store 中注册组件实例
  componentDidMount() {
    this.unRegister = this.context.registerField(this);
  }

  // 4、注销 store 中的组件实例
  componentWillUnmount() {
    this.unRegister();
  }

  render() {
    console.log("render", this.props.name);

    const controlledChild = React.cloneElement(
      this.props.children,
      this.getControlled()
    );
    return controlledChild;
  }
}
