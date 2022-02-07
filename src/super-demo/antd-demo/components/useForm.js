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
    this.store = {};
  }

  // 2、实现操作状态的方法 get set
  // 2.1、多个字段的 set 操作
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
  };

  // 2.2、多个字段的 get 操作
  getFieldsValue = () => ({ ...this.store });

  // 2.3、单个字段的 set 操作
  setFieldValue = (field, val) => (this.store[field] = val);

  // 2.4、单个字段的 get 操作
  getFieldValue = (field) => this.store[field];

  // 暴露操作状态的方法
  getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldValue: this.setFieldValue,
    getFieldValue: this.getFieldValue,
  });
}

export function useForm() {
  const formRef = useRef();

  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
