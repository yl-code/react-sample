export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 未增强的 dispatch
    let dispatch = store.dispatch;

    // 增强 dispatch 后
    // 调用一次 dispatch, 所有中间件函数会被依次调用，最后执行 store.dispatch
    // 每个中间件函数都是可以进行读写 store 的操作，因此这里定义一个用于操作 store 的对象
    const storeApi = {
      getState: store.getState,
      // 用匿名箭头函数包了一层，它里面的 dispatch 就被固定下来，即为上面声明的 dispatch 变量
      // 下面 27 行代码， dispatch 变量被赋值为 增强之后的 dispatch 函数
      // 因此不管哪个中间件中使用 storeApi.dispatch 都相当于调用增强的 dispatch
      dispatch: (action) => dispatch(action),

      // 下面两种方式是等价的，都是直接引用的 store 里面的原始 dispatch，不符合要求
      // dispatch: store.dispatch,
      // dispatch,
    };

    // chain 里面是：每个中间件接收 storeApi 执行后的结果，也是一个函数
    // middleware 是一个三层嵌套函数形成的闭包，每层函数依次接收的参数是 storeApi, next, action
    const chain = middlewares.map((middleware) => middleware(storeApi));

    // 这里就是增强的 dispatch，供外部使用
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
