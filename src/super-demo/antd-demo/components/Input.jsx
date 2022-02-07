import React, { Component } from "react";

/**
 * rc-form 的 createForm 这个用法不能用函数组件
 *
 * Warning: Function components cannot be given refs.
 * Attempts to access this ref will fail.
 * Did you mean to use React.forwardRef()?
 *
 */

export function Input(props) {
  const { value = "", ...otherProps } = props;
  return <input style={{ outline: "none" }} value={value} {...otherProps} />;
}

// const MyInput = (props) => <input style={{ outline: "none" }} {...props} />;

// export class Input extends Component {
//   render() {
//     const { value = "", ...otherProps } = this.props;
//     return (
//       <div style={{ padding: 10 }}>
//         <MyInput value={value} {...otherProps}></MyInput>
//       </div>
//     );
//   }
// }
