import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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

    // 当 store 发生改变时，组件立即更新，所以需要使用 useLayoutEffect
    // 不能使用 useEffect，它俩执行时机不一样
    // useEffect 在 dom 变更后延迟执行，延迟的时间段内如果再次发生状态值的改变，那么可能会导致漏掉一次更新
    // useLayoutEffect 在 dom 变更后同步执行
    useLayoutEffect(() => {
      const unsubscribe = store.subscribe(forceUpdate);
      return unsubscribe;
    }, [store]);

    return <Component {...props} {...stateProps} {...dispatchProps} />;
  };

// hook api
export const useDispatch = () => {
  const store = useContext(Context);
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useContext(Context);
  const selectedState = selector(store.getState());

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(forceUpdate);
    return unSubscribe;
  }, [store]);

  return selectedState;
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
