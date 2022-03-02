import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST,
} from '../action';

const userState = {
  isLogin: false,
  userInfo: { id: '', name: '', score: 0 },
  loading: false,
  err: { msg: '' },
};

// console.log("store init");

export const loginReducer = (state = { ...userState }, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loading: false,
        userInfo: { ...payload },
      };
    case LOGIN_FAILED:
      return { ...state, ...userState, ...payload };
    case LOGOUT_SUCCESS:
      return { ...state, isLogin: false, loading: false };
    default:
      return state;
  }
};
