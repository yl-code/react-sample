import React from "react";
import { FormContext } from "./FormContext";
import { useForm } from "./useForm";

/**
 *
 * 将所有的 Filed 组件的状态，都放在了自定义的状态管理库 FormStore 中
 * 然后通过 context 将 FormStore 的实例进行跨层级传递给子孙组件，以进行消费
 *
 */
export default function Form({ children, form }) {
  const [formInstance] = useForm(form);
  return (
    <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
  );
}
