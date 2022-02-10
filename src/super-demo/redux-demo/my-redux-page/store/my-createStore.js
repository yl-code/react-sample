export function createStore(reducer) {
  let currentState = null; // 用于存放 store 的数据
  const listeners = []; // 用于存放监听的回掉

  const getState = () => currentState;

  const dispatch = (action) => {
    // 执行 reducer
    currentState = reducer(currentState, action);

    // 执行监听的回掉
    listeners.forEach((listener) => listener());
  };

  // 注册监听回掉
  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
