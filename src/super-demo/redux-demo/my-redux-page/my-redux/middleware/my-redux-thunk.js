// 实现 redux-thunk 中间件
export const thunk = ({ dispatch }) => {
  // 接收 storeApi，返回一个函数
  return (next) => (action) => {
    console.log("thunk middleware exec");

    if (typeof action === "function") {
      return action(dispatch);
    }

    next(action);
  };
};
