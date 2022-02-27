export default {
  namespace: "user",
  state: {
    title: "user model",
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log("user subscriptions exec");
    },
  },
  effects: {
    *changeTitle({ payload }, { call, put }) {
      yield put({ type: "save", payload });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, title: action.payload };
    },
  },
};
