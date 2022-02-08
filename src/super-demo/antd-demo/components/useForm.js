import { useRef } from "react";

// 1、实现一个专属 Form 的状态管理库
/**
 *
 * 如何将这个状态管理库与 react 进行关联
 *
 * 可以通过 context 将状态管理库实例传递给组件的子孙组件
 *
 */
class FormStore {
  constructor() {
    this.store = {}; // 用于存放组件数据

    this.fieldEntities = []; // 用于存放 field 组件实例

    this.callbacks = {}; // 用于存放 field 组件的回掉钩子

    this.rules = {}; // 用于存放 field 组件的校验规则
  }

  // 2、实现操作状态的方法 get set
  // 2.1、多个字段的 set 操作
  setFieldsValue = (newStore) => {
    // 先更新 store 中的数据
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 然后更新组件
    this.fieldEntities.forEach((instance) => {
      Object.keys(newStore).forEach((name) => {
        // 只有当 newStore 中的相关 name 的组件的状态发生改变时，才更新对应的组件
        if (name === instance.props.name) {
          instance.onStoreChange();
        }
      });
    });
  };

  // 2.2、多个字段的 get 操作
  getFieldsValue = () => ({ ...this.store });

  // 2.3、单个字段的 set 操作
  setFieldValue = (field, val) => {
    this.setFieldsValue({ [field]: val });
  };

  // 2.4、单个字段的 get 操作
  getFieldValue = (field) => this.store[field];

  // 3、注册需要更新的组件实例
  registerField = (fieldInstance) => {
    this.fieldEntities.push(fieldInstance);

    // 返回一个函数，用于注销已注册的组件实例，并清空 store 中的相关数据
    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (instance) => instance !== fieldInstance
      );

      delete this.store[fieldInstance.props.name];
    };
  };

  setRules = (name, rules) => {
    this.rules[name] = rules;

    return () => {
      delete this.rules[name];
    };
  };

  // 4、校验用户输入的数据
  validate = () => {
    const { rules, store } = this;
    const err = [];

    Object.keys(this.rules).forEach((name) => {
      // 这里每个 field 的 rules 都是是一个数组
      // 所以应该遍历 rules 中的规则，按照规则对 field 的数据进行校验
      // 这里简化处理，只判断 field 是否有值
      if (rules[name][0].required && !store[name]) {
        err.push({
          name,
          msg: rules[name][0].message,
        });
      }
    });

    return err;
  };

  // 5、注册回掉函数
  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // 6、提交所有数据
  submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;

    if (err.length) {
      // 数据校验有失败的
      onFinishFailed({ err, data: this.store });
    } else {
      //数据校验全部通过
      onFinish({ data: this.store });
    }
  };

  // 暴露操作状态的方法
  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldValue: this.setFieldValue,
    getFieldValue: this.getFieldValue,
    registerField: this.registerField,
    setCallbacks: this.setCallbacks,
    submit: this.submit,
    setRules: this.setRules,
  });
}

export function useForm(form) {
  const formRef = useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
