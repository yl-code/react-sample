import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

/**
 * connect 方法的第一个参数
 *
 * mapStateToProps 只能是一个 function
 * 接收一个 state，就是上层 provider 传递的 store
 * 返回一个对象，将被合并到 ReactReduxPage 上
 */
const mapStateToProps = (state) => ({ count: state });

/**
 * connect 方法的第三个参数
 *
 * mapDispatchToProps 可以是一个 object 或者 function
 */
// // 下面是 object 写法，object 同样会被合并到组件的 props 上
// 这种写法比较简洁，但是组件拿不到 dispatch
// const mapDispatchToProps = {
//   add: () => ({ type: "ADD" }),
//   minus: () => ({ type: "MINUS" }),
// };
// 下面是 function 写法，接收 store 的 dispatch 方法，返回一个对象合并到组件的 props 上
// 这种写法更加灵活，可以直接封装我们自己想要的 dispatch 方法
// 也可以直接用对象的写法，加上 bindActionCreators 进行转换
const mapDispatchToProps = (dispatch) => {
  // 1
  const minus = () => dispatch({ type: "MINUS" });

  //2
  let creators = {
    add: () => ({ type: "ADD" }),
  };
  creators = bindActionCreators(creators, dispatch);

  return { dispatch, minus, ...creators };
};

/**
 * connect 方法的第三个参数
 *
 * mergeProps 是一个 function
 * 依次接收 mapStateToProps 返回的结果，mapDispatchToProps 返回的结果，组件本身的 props
 * 返回 props 合并之后的结果
 */
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  console.log(stateProps);
  console.log(dispatchProps);
  console.log(ownProps);

  return { ...stateProps, ...dispatchProps, ...ownProps };
};

/**
 * class 组件中 react-redux 依然使用高阶组件的方法
 *
 * 所以这里使用装饰器的写法
 *
 * connect 默认会将 store 的 dispatch 方法映射到组件的 props 上
 */
@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export class ReactReduxPage extends Component {
  render() {
    const { count, add, minus } = this.props;
    console.log(this.props);
    return (
      <div>
        <button onClick={add}>count add: {count}</button>
        <button onClick={minus}>count minus: {count}</button>
      </div>
    );
  }
}
