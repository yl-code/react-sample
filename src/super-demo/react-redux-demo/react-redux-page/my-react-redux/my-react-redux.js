import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { bindActionCreators } from ".";

// 跨层级数据传递 三部曲
// 1、创建 context 对象
const Context = React.createContext();

// 2、使用 provider 传递 value
export const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

// 3、子组件消费 value
export const connect =
  (mapStateToProps, mapDispatchToProps, mergeProps) =>
  (Component) =>
  (props) => {
    const store = useContext(Context);
    const stateProps = mapStateToProps(store.getState());
    let dispatchProps = { dispatch: store.dispatch };

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(store.dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
    }

    const forceUpdate = useForceUpdate();

    useEffect(() => {
      store.subscribe(forceUpdate);
    }, [store]);

    return <Component {...props} {...stateProps} {...dispatchProps} />;
  };

// utils
// 自定义 hook 实现类似于 class 组件的 forceUpdate 的作用
const useForceUpdate = () => {
  // 实现方式 1
  const [, update] = useState({});
  return useCallback(() => {
    update({});
  }, []);

  // 实现方式 2
  // const [, update] = useReducer((x) => x + 1, 0);
  // return update;
};
