/**
 *
 * combineReducers 接收 reducer 的映射关系
 *
 * 返回合并后的 总 reducer
 *
 */
export const combineReducers = (reducerDict) => {
  // 返回是合并之后的总 reducer，所以也会接收 prevState 和 action
  return (prevState = {}, action) => {
    const nextState = {};

    let hasChanged = false;

    for (const key in reducerDict) {
      const reducer = reducerDict[key];
      nextState[key] = reducer(prevState[key], action);

      hasChanged = hasChanged || nextState[key] !== prevState[key];
    }

    hasChanged =
      hasChanged ||
      Object.keys(nextState).length !== Object.keys(prevState).length;

    return hasChanged ? nextState : prevState;
  };
};
