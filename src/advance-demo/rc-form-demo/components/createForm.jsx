import React, { Component } from "react";

export function createForm(Com) {
  /**
   * 这里需要返回一个组件
   * 如果将 class 组件写在外面，然后在这里返回
   * 那返回的就不是一个组件，是一个 jsx 对象
   * 细品！！！
   */
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {};

      this.options = {};
    }

    onChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    getFieldDecorator = (fieldName, option) => (FieldCom) => {
      this.options[fieldName] = option;

      return React.cloneElement(FieldCom, {
        name: fieldName,
        value: this.state[fieldName],
        onChange: this.onChange,
      });
    };

    validateFields = (callback) => {
      const err = [];

      // 这里默认只校验：值是否为空的情况
      for (const fieldName in this.options) {
        if (!this.state[fieldName]) {
          err.push({ [fieldName]: this.options[fieldName].rules[0].message });
        }
      }

      const res = { value: this.state };
      if (err.length) {
        res.err = err;
      }

      callback(res);
    };

    getFieldsValue = () => {
      return this.state;
    };

    // 设置时就是传的一个对象
    setFieldsValue = (newValue) => {
      this.setState(newValue);
    };

    getForm = () => ({
      getFieldDecorator: this.getFieldDecorator,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      validateFields: this.validateFields,
    });

    render() {
      const { ...otherProps } = this.props;
      const form = this.getForm();

      return <Com {...otherProps} form={form} />;
    }
  };
}
