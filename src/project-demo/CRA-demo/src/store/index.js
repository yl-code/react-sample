import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { loginReducer } from './loginReducer';
import { loginSaga } from '../action/loginSaga';

// 使用 redux-thunk
// export const store = createStore(
//   combineReducers({ user: loginReducer }),
//   applyMiddleware(thunk)
// );

// 使用 redux-saga

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga);
