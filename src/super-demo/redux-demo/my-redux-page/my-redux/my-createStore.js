export function createStore(reducer, enhancer) {
  // 不使用中间件时，dispatch 只能接受一个普通对象
  // 使用中间件时，则可以增加 dispatch 的能力
  // 那么可以将一个接收中间件的 applyMiddleware 函数的执行结果，当作 createStore 的第二个参数传入，也就是 enhancer，它也是一个函数
  if (enhancer) {
    // 这里就是如果传入 enhancer，就返回增强了 dispatch 的 store
    // 否则就还是按照原来的逻辑走
    return enhancer(createStore)(reducer);
  }

  let currentState; // 用于存放 store 的数据
  let listeners = []; // 用于存放监听的回掉

  const getState = () => currentState;

  const dispatch = (action) => {
    // 执行 reducer
    currentState = reducer(currentState, action);

    // 执行监听的回掉
    listeners.forEach((listener) => listener());
  };

  // 注册监听回掉
  const subscribe = (newListener) => {
    listeners.push(newListener);

    // 返回一个移除监听回掉的方法
    return () => {
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  };

  // 解决 currentState 没有初始值的问题
  dispatch({ type: `${Date.now()}` });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
