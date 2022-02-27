import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from './src/Router';
import { store } from './src/store';

export function CRADemo() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
