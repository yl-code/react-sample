import React, { useRef } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from './Router';

export function BrowserRouter({ children }) {
  const historyRef = useRef(createBrowserHistory());
  const history = historyRef.current;

  return <Router history={history}>{children}</Router>;
}
