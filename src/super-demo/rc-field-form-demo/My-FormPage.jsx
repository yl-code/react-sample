/**
 *
 * 与 RCFieldFormPage 同样的使用
 * 只是没有引用 rc-field-form
 * 用的是自己实现的 Form 与 Field 组件
 *
 */

import React, { Component, useEffect } from 'react';

// import Form, { Field } from "rc-field-form";
import { Input, Field, Form } from './my-rc-field-form';

const userRules = [{ required: true, message: '请输入账号' }];
const pwdRules = [{ required: true, message: '请输入密码' }];

/**
 *
 * form class demo
 *
 */
export class ClassMyRCFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ user: 'class form default' });
  }

  onFinish = (val) => console.log('onFinish', val);

  onFinishFailed = (val) => console.log('onFinishFailed', val);

  render() {
    return (
      <div style={{ width: 500, margin: 'auto' }}>
        <h2>class-my-rc-field-formPage</h2>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Field name='user' label='账号' rules={userRules}>
            <Input placeholder='请输入账号' />
          </Field>

          <Field name='pwd' label='密码' rules={pwdRules}>
            <Input placeholder='请输入密码' />
          </Field>

          <button>Submit</button>
        </Form>
      </div>
    );
  }
}

/**
 *
 * form hook demo
 *
 */
export const FuncMyRCFormPage = () => {
  const [form] = Form.useForm();

  const onFinish = (val) => console.log('onFinish', val);

  const onFinishFailed = (val) => console.log('onFinishFailed', val);

  useEffect(() => {
    form.setFieldsValue({ user: 'hook form default' });
  }, []);

  return (
    <div style={{ width: 500, margin: 'auto' }}>
      <h2>func-my-rc-field-formPage</h2>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name='user' label='账号' rules={userRules}>
          <Input placeholder='请输入账号' />
        </Field>

        <Field name='pwd' label='密码' rules={pwdRules}>
          <Input placeholder='请输入密码' />
        </Field>

        <button>Submit</button>
      </Form>
    </div>
  );
};
