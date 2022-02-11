// 实现 logger 中间件
export const logger = ({ getState }) => {
  // 接收 storeApi，返回一个函数
  return (next) => (action) => {
    console.log("logger next");

    console.log("====================================");
    // console.log(action);

    const prevState = getState();
    console.log("prev state", prevState);

    const res = next(action);
    const nextState = getState();
    console.log("next state", nextState);
    console.log("====================================");

    // 上一个中间件的返回值是下一个中间件的参数
    return res;
  };
};
