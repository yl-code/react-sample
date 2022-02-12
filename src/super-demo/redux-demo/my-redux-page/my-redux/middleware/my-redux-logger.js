// 实现 logger 中间件
export const logger = ({ getState }) => {
  // 接收 storeApi，返回一个函数
  return (next) => (action) => {
    console.log("logger next:", next.name);

    console.log("====================================");
    // console.log(action);

    const prevState = getState();
    console.log("prev state", prevState);

    const res = next(action);

    const nextState = getState();
    console.log("next state", nextState);
    console.log("====================================");

    console.log("logger", res);
    // return res;
  };
};
