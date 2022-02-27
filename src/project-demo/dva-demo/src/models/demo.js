import { dataRequest } from "../services/demo";

export default {
  namespace: "demo",

  state: {
    data: [],
    size: 50,
    current: 1,
    total: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log("demo subscriptions exec");
    },
  },

  effects: {
    *getTableData({ payload }, { call, put }) {
      // 就是视图层传过来的参数
      console.log(payload);

      // 调用 service，拿到请求的数据
      const res = yield call(dataRequest, payload);

      console.log(res);

      // 更新数据
      yield put({ type: "saveUserData", payload: res.data.data });
    },
  },

  reducers: {
    saveUserData(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
