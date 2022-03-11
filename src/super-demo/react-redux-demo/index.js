import React from 'react';
import { ReactReduxHookPage } from './ReactReduxHookPage';
import { ReactReduxPage } from './ReactReduxPage';
import { store } from './store';

// import { Provider } from "react-redux";
import { Provider } from './react-redux-page/my-react-redux';

export function ReactReduxDemo() {
  return (
    <Provider store={store}>
      <ReactReduxPage ownProps={'ownProps'} />
      <hr />
      <ReactReduxHookPage ownProps={'ownProps'} />
    </Provider>
  );
}
