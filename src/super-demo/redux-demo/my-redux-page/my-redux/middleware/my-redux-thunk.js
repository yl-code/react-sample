// 实现 logger 中间件
export const thunk = ({ dispatch }) => {
  // 接收 storeApi，返回一个函数
  return (next) => (action) => {
    console.log("thunk next");

    if (typeof action === "function") {
      return action(dispatch);
    }

    return next(action);
  };
};
