import React, { Component } from 'react';
// import { createForm } from "rc-form";
import { createForm } from './my-rc-form/createForm';
import { Input } from './my-rc-form/Input';

const rules = {
  user: { required: true, message: '请输入用户名！' },
  pwd: { required: true, message: '请输入密码！' },
};

@createForm
export class MyCreateFormDemo extends Component {
  submit = () => {
    const { form } = this.props;
    const allValue = form.getFieldsValue();
    console.log(allValue);

    form.validateFields(({ err, value }) => {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('success', value);
      }
    });
  };

  renderField = (type) => {
    const { form } = this.props;

    return form.getFieldDecorator(type, { rules: [rules[type]] })(
      <Input placeholder={type} />
    );
  };

  componentDidMount() {
    const { form } = this.props;
    form.setFieldsValue({ user: 'defaultVal' });
  }

  render() {
    const { form } = this.props;
    console.log(form);

    return (
      <div>
        {this.renderField('user')}
        {this.renderField('pwd')}
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}
