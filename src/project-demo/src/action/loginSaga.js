import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from '.';
import { userService } from '../service';

function* handleLogin(action) {
  yield put({ type: REQUEST });

  try {
    const user = yield call(userService.login, action.payload);
    const userMoreInfo = yield call(userService.getMoreInfo, user);

    yield put({ type: LOGIN_SUCCESS, payload: userMoreInfo });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error });
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, handleLogin);
}
