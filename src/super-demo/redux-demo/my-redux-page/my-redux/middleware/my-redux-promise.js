import isPromise from "is-promise";
import { isFSA } from "flux-standard-action";

// 简易版
export const promise = ({ dispatch }) => {
  return (next) => (action) => {
    console.log("promise middleware exec");

    isPromise(action.payload)
      ? action.payload.then((payload) => dispatch({ ...action, payload }))
      : next(action);
  };
};

// 完整版，增加了 isFSA 的判断
export const promiseFull = ({ dispatch }) => {
  return (next) => (action) => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload
          .then((res) => dispatch({ ...action, payload: res }))
          .catch((err) => {
            dispatch({ ...action, payload: err });
            return Promise.reject(err);
          })
      : next(action);
  };
};
