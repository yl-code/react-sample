import React from "react";
import { FormContext } from "./FormContext";
import { useForm } from "./useForm";

/**
 *
 * 将所有的 Filed 组件的状态，都放在了自定义的状态管理库 FormStore 中
 * 然后通过 context 将 FormStore 的实例进行跨层级传递给子孙组件，以进行消费
 *
 */
export default function Form(
  { children, form, onFinishFailed, onFinish },
  ref // 使用 forwardRef，将 Form 接收的 ref 进行转发
) {
  const [formStore] = useForm(form);

  // 通过 useImperativeHandle hook 将 formStore 暴露给父组件
  React.useImperativeHandle(ref, () => formStore);

  // 注册 Form 上的回掉函数，数据校验后，提交数据时调用
  formStore.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formStore.submit();
      }}
    >
      <FormContext.Provider value={formStore}>{children}</FormContext.Provider>
    </form>
  );
}
