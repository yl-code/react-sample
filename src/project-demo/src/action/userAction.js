import { co } from 'co';
import { LOGIN_FAILED, LOGIN_SAGA, REQUEST } from '.';
import { userService } from '../service';
import { LOGIN_SUCCESS } from './const';

// 同步场景
// export const login = (userInfo) => ({ type: LOGIN_SUCCESS, payload: userInfo });

const getMoreInfo = (dispatch, userInfo) => {
  userService
    .getMoreInfo(userInfo)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res });
    })
    .catch((err) => dispatch({ type: LOGIN_FAILED, payload: err }));
};

const loginPromise = (dispatch, userInfo) => {
  return userService
    .login(userInfo)
    .then((res) => res)
    .catch((err) => dispatch({ type: LOGIN_FAILED, payload: err }));
};

/******************************************************************************
 *
 * 1、使用【 redux-thunk + 普通回掉函数 】的方案来解决异步问题
 *
 * 容易造成嵌套层级过深，形成嵌套回掉地狱
 *
 */
// export const login = (userInfo) => (dispatch) => {
//   dispatch({ type: REQUEST });

//   userService
//     .login(userInfo)
//     .then((res) => {
//       // dispatch({ type: LOGIN_SUCCESS, payload: res });

//       // 登录成功之后，继续获取更多用户信息
//       // 容易造成回掉地狱
//       getMoreInfo(dispatch, res);
//     })
//     .catch((err) => dispatch({ type: LOGIN_FAILED, payload: err }));
// };

/******************************************************************************
 *
 * 2、使用【 redux-thunk + async-await 】的方案来解决异步问题
 *
 * 它是 generator 的语法糖
 *
 */
// export const login = (userInfo) => {
//   return async (dispatch) => {
//     dispatch({ type: REQUEST });

//     const user = await loginPromise(dispatch, userInfo);

//     if (user.id) {
//       getMoreInfo(dispatch, user);
//     }
//   };
// };

/******************************************************************************
 *
 * 3、使用【 redux-thunk + generator 】的方案来解决异步问题
 *
 * 这里使用 co 来帮助我们自动执行 generator 函数产生的遍历器对象
 *
 */
// export const login = (userInfo) => (dispatch) => {
//   return co(function* () {
//     dispatch({ type: REQUEST });

//     const user = yield loginPromise(dispatch, userInfo);

//     if (user.id) {
//       getMoreInfo(dispatch, user);
//     }
//   });
// };

/******************************************************************************
 *
 * 4、使用【 redux-saga 】的方案来解决异步问题
 *
 */
export const login = (userInfo) => ({ type: LOGIN_SAGA, payload: userInfo });
