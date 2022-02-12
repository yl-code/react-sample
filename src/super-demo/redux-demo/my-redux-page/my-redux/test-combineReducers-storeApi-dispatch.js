const store = {
  dispatch: () => {
    console.log("old");
  },
};

let dispatch = store.dispatch;

const api = {
  // dispatch,
  dispatch: () => dispatch(),
};

const fn = ((api) => {
  return api.dispatch;
})(api);

dispatch = () => {
  console.log("new new");
};

fn();
