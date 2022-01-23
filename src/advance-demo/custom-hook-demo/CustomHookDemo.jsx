import React from "react";
import { useClock } from "./useClock";

/**
 * hook Api 的使用规则:
 * 只能使用在函数组件或者自定义 hook 中
 * 只能使用在函数作用域的顶层，不能放在条件语句、循环语句等可能改变 hook Api 执行顺序的语句内使用
 * 不要在子函数中使用
 *
 * 自定义 hook 的使用规则:
 * 自定义 hook 就是一个函数名必须以 use 开头的函数，函数内部可以使用其他 hook
 *
 */

export function CustomHookDemo() {
  // 使用自定义 hook
  return <h1>{useClock().toLocaleString()}</h1>;
}
