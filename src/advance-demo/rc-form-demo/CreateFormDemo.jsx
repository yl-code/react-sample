import React, { Component } from "react";
import { createForm } from "rc-form";
import { Input } from "./components/Input";

const rules = {
  user: { required: true, message: "请输入用户名！" },
  pwd: { required: true, message: "请输入密码！" },
};

@createForm()
export class CreateFormDemo extends Component {
  submit = () => {
    const { form } = this.props;
    const allValue = form.getFieldsValue();
    console.log(allValue);
  };

  renderField = (type) => {
    const { form } = this.props;

    return form.getFieldDecorator(type, { rules: [rules[type]] })(
      <Input placeholder={type} />
    );
  };

  componentDidMount() {
    const { form } = this.props;
    form.setFieldsValue({ user: "defaultVal" });
  }

  render() {
    const { form } = this.props;
    console.log(form);

    return (
      <div>
        {this.renderField("user")}
        {this.renderField("pwd")}
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}
