/**
 * jsx 插值表达式小 demo
 */

import React, { Component } from "react";

export class JsxDemo extends Component {
  render() {
    // JSX 对象
    const jsxObj = <span>jsx-obj</span>;

    // 函数
    const formatStr = (str) => `${str} world`;

    return (
      <div>
        <h2>
          字符串与数字：{"hello"} - {8}
        </h2>

        <h2>JSX 对象：{jsxObj}</h2>

        <h2>函数：{formatStr("hello")}</h2>

        {/* 数组会被作为一组子元素对待 */}
        <h2>数组：{[1, 2, 3]}</h2>
        <ul>
          {/* diff 时候，首先比较 type，然后是 key，所以同级同类型元素，key 值必须唯一 */}
          {[1, 2, 3].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* 布尔值、null、undefined 会被忽略不显示 */}
        <h2>布尔值：{true}</h2>
        <h2>null：{null}</h2>
        <h2>undefined：{undefined}</h2>

        {/* 直接使用原生 js 对象会报错 */}
        {/* react-dom.development.js:13231 Uncaught Error: Objects are not valid as a React child */}
        {/* <h2>{{ a: 1 }}</h2> */}
      </div>
    );
  }
}
