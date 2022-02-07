import React, { Component, useEffect } from "react";
import Form, { Field } from "rc-field-form";
import { Input } from "./components";

const userRules = [{ required: true, message: "请输入账号" }];
const pwdRules = [{ required: true, message: "请输入密码" }];

/**
 *
 * rc-field-form class demo
 *
 */
export class ClassRCFieldFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ user: "class form default" });
  }

  onFinish = (val) => console.log("onFinish", val);

  onFinishFailed = (val) => console.log("onFinishFailed", val);

  render() {
    return (
      <div style={{ width: 500, margin: "auto" }}>
        <h2>Class-RC-Field-FormPage</h2>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Field name="user" label="账号" rules={userRules}>
            <Input placeholder="请输入账号" />
          </Field>

          <Field name="pwd" label="密码" rules={pwdRules}>
            <Input placeholder="请输入密码" />
          </Field>

          <Field>
            <button>Submit</button>
          </Field>
        </Form>
      </div>
    );
  }
}

/**
 *
 * rc-field-form hook demo
 *
 */
export const FuncRcFieldFormPage = () => {
  const [form] = Form.useForm();

  const onFinish = (val) => console.log("onFinish", val);

  const onFinishFailed = (val) => console.log("onFinishFailed", val);

  useEffect(() => {
    console.log(form);

    form.setFieldsValue({ user: "hook form default" });
  }, []);

  return (
    <div style={{ width: 500, margin: "auto" }}>
      <h2>Func-RC-Field-FormPage</h2>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="user" label="账号" rules={userRules}>
          <Input placeholder="请输入账号" />
        </Field>

        <Field name="pwd" label="密码" rules={pwdRules}>
          <Input placeholder="请输入密码" />
        </Field>

        <Field>
          <button>Submit</button>
        </Field>
      </Form>
    </div>
  );
};
