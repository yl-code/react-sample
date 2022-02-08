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

    this.fieldEntities = []; // 用于存放组件实例
  }

  // 2、实现操作状态的方法 get set
  // 2.1、多个字段的 set 操作
  setFieldsValue = (newStore) => {
    // 更新 store 中的数据
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 再更新组件
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

  // 暴露操作状态的方法
  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldValue: this.setFieldValue,
    getFieldValue: this.getFieldValue,
    registerField: this.registerField,
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
