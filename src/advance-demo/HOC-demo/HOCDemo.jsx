import React, { Component } from "react";

const HocFoo = (Com) => (props) => {
  return (
    <div
      style={{
        border: "1px solid teal",
        padding: 10,
        boxSizing: "border-box",
        margin: "50px auto",
      }}
    >
      <Com decorator="HocFoo" {...props}></Com>
    </div>
  );
};

const FuncChild = () => {
  return <div>func child</div>;
};

const NewFuncChild = HocFoo(FuncChild);
const NewFuncChild2 = HocFoo(HocFoo(FuncChild)); // 可以嵌套多层 HOC

// 类组件还可以使用装饰器的写法
@HocFoo
@HocFoo
class ClassChild extends Component {
  render() {
    const { decorator } = this.props;
    return <div>Class child: {decorator}</div>;
  }
}

export function HOCDemo() {
  return (
    <div>
      <NewFuncChild />
      <NewFuncChild2 />
      <ClassChild />
    </div>
  );
}
