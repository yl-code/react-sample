import React, { Component, useEffect } from "react";
import { Button, Form, Input } from "antd";

const userRules = [{ required: true, message: "请输入账号" }];
const pwdRules = [{ required: true, message: "请输入密码" }];

/**
 *
 * antd form class demo
 *
 */
export class ClassAntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ user: "class form default" });
  }

  onFinish = (val) => console.log("onFinish", val);

  onFinishFailed = (val) => console.log("onFinishFailed", val);

  render() {
    return (
      <div style={{ width: 500, margin: "auto" }}>
        <h2>Class-AntdFormPage</h2>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item name="user" label="账号" rules={userRules}>
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item name="pwd" label="密码" rules={pwdRules}>
            <Input placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

/**
 *
 * antd form hook demo
 *
 */
export const FuncAntdFormPage = () => {
  const [form] = Form.useForm();

  const onFinish = (val) => console.log("onFinish", val);

  const onFinishFailed = (val) => console.log("onFinishFailed", val);

  useEffect(() => {
    console.log(form);

    form.setFieldsValue({ user: "hook form default" });
  }, []);

  return (
    <div style={{ width: 500, margin: "auto" }}>
      <h2>Func-AntdFormPage</h2>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="user" label="账号" rules={userRules}>
          <Input placeholder="请输入账号" />
        </Form.Item>

        <Form.Item name="pwd" label="密码" rules={pwdRules}>
          <Input placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
