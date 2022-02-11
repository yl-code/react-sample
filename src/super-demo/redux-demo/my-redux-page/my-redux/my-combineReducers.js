/**
 *
 * combineReducers 接收 reducer 的映射关系
 *
 * 返回合并后的 总 reducer
 *
 */
export const combineReducers = (reducerDict) => {
  return (state = {}, action) => {
    const nextState = {};

    let hasChanged = false;

    for (const key in reducerDict) {
      const reducer = reducerDict[key];
      nextState[key] = reducer(state[key], action);

      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
};
