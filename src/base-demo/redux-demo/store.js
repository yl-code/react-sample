import { createStore } from "redux";

const countReducer = (state = 0, action) => {
  console.log(state, action);

  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

export const store = createStore(countReducer);
