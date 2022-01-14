import React, { Component } from "react";

export class JsxDemo extends Component {
  render() {
    // 对象
    // const obj = { a: 1 };

    // 数组
    const arr = [1, 2, 3];

    // 布尔值
    const bool = true;

    // JSX 对象
    const jsxObj = <span>jsx-obj</span>;

    // 函数
    const formatStr = (str) => `${str} world`;

    return (
      <div>
        <h2>
          字符串与数字：{"hello"} - {8}
        </h2>

        {/* 直接使用 js 对象会报错 */}
        {/* react-dom.development.js:13231 Uncaught Error: Objects are not valid as a React child */}
        {/* <h2>{{ a: 1 }}</h2> */}

        <h2>jsx 对象：{jsxObj}</h2>

        {/* 数组会被作为一组子元素对待 */}
        <h2>数组：{[1, 2, 3]}</h2>
        <ul>
          {/* diff 时候，首先比较 type，然后是 key，所以同级同类型元素，key 值必须唯一 */}
          {[1, 2, 3].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* 布尔值、null、undefined 会被忽略不显示 */}
        <h2>布尔值：{bool}</h2>
        <h2>null：{bool}</h2>
        <h2>undefined：{bool}</h2>

        <h2>函数：{formatStr("hello")}</h2>
      </div>
    );
  }
}
