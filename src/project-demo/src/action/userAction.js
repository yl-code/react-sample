import { LOGIN_FAILED, REQUEST } from ".";
import { userService } from "../service";
import { LOGIN_SUCCESS } from "./const";

// 同步
// export const login = (userInfo) => ({ type: LOGIN_SUCCESS, payload: userInfo });

// 异步
export const login = (userInfo) => (dispatch) => {
  dispatch({ type: REQUEST });

  userService
    .login(userInfo)
    .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res }))
    .catch((err) => dispatch({ type: LOGIN_FAILED, payload: err }));
};
