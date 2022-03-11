const bindActionCreator = (creator, dispatch) => {
  return (...arg) => {
    dispatch(creator(...arg));
  };
};

export const bindActionCreators = (creators, dispatch) => {
  const newCreators = {};

  for (const key in creators) {
    newCreators[key] = bindActionCreator(creators[key], dispatch);
  }

  return newCreators;
};
