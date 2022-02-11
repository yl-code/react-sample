export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 未增强之前的 dispatch
    let dispatch = store.dispatch;

    // 增强 dispatch 后
    // 调用一次 dispatch, 所有中间件函数会被依次调用，最后执行 store.dispatch
    // 每个中间件函数都是可以进行读写 store 的操作，因此这里定义一个用于操作 store 的对象
    const storeApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
      // dispatch,
    };

    // chain 里面是：每个中间件接收 storeApi 执行后的结果，也是一个函数
    // middleware 是一个闭包，wrapper function
    const chain = middlewares.map((middleware) => middleware(storeApi));

    dispatch = compose(...chain)(dispatch);

    return {
      ...store,
      dispatch,
    };
  };
};

const compose = (...func) => {
  if (!func.length) return (arg) => arg;

  if (func.length === 1) return func[0];

  return func.reduce(
    (a, b) =>
      (...arg) =>
        a(b(...arg))
  );
};
