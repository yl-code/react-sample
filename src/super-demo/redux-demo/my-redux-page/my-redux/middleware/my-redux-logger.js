// 实现 logger 中间件
// 接收 storeApi，返回一个函数
export const logger = ({ getState }) => {
  return function loggerDispatchWarp(next) {
    console.log('loggerDispatchWarp exec, next: ', next.name);

    return function loggerDispatch(action) {
      console.log('loggerDispatch', action);

      console.log('====================================');
      // console.log(action);

      const prevState = getState();
      console.log('prev state', prevState);

      next(action);

      const nextState = getState();
      console.log('next state', nextState);
      console.log('====================================');
    };
  };
};
