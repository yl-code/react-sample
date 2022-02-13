// 实现 redux-thunk 中间件
// 接收 storeApi，返回一个函数
export const thunk = ({ dispatch }) => {
  return function thunkDispatchWarp(next) {
    console.log("thunkDispatchWarp exec, next: ", next.name);

    return function thunkDispatch(action) {
      console.log("thunkDispatch exec", action);

      if (typeof action === "function") {
        return action(dispatch);
      }

      next(action);
    };
  };
};
