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

  componentDidMount() {
    const { rules, name } = this.props;

    // 3、在 store 中注册 field 组件的 实例 与 组件的校验规则
    this.unRegister = this.context.registerField(this);

    if (this.props.rules.length) {
      this.removeRules = this.context.setRules(name, rules);
    }
  }

  // 4、注销 store 中的组件实例 与校验规则
  componentWillUnmount() {
    this.unRegister();
    this.removeRules();
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
