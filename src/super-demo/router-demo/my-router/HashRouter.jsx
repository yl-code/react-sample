import React, { useMemo } from 'react';
import { createHashHistory } from 'history';
import { Router } from './Router';

export function HashRouter({ children }) {
  let history = useMemo(() => createHashHistory(), []);

  return <Router history={history} children={children} />;
}
