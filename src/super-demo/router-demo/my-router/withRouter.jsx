import { RouterContext } from "./RouterContext";

/**
 * withRouter 是一个高阶段组件，用于解决子孙组件无法拿到 route props 的场景
 *
 * 什么情况下，子孙组件无法拿到 route props
 *
 * Route 组件使用 render 属性来接受渲染组件时
 */
export const withRouter = (Com) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => {
        return <Com {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};
