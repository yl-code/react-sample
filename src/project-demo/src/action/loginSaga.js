import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from '.';
import { userService } from '../service';

function* handleLogin(action) {
  yield put({ type: REQUEST });

  try {
    // 使用 call 阻塞接口请求，拿到请求结果之后，才往下执行
    const user = yield call(userService.login, action.payload);
    const userMoreInfo = yield call(userService.getMoreInfo, user);

    yield put({ type: LOGIN_SUCCESS, payload: userMoreInfo });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error });
  }
}

// 写法 1，使用 takeEvery
// export function* loginSaga() {
//   yield takeEvery(LOGIN_SAGA, handleLogin);
// }

// 写法 2，使用 take
export function* loginSaga() {
  // take 只会监听一次，这跟 takeEvery 一直监听是不一样的，所以需要使用循环来监听
  while (true) {
    const action = yield take(LOGIN_SAGA);

    // yield call(handleLogin, action);
    yield fork(handleLogin, action);

    console.log('call 会阻塞后面的代码执行，fork 则不会阻塞代码执行');
  }
}
