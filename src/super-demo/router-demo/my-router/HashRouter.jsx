import React from "react";
import { createHashHistory } from "history";
import { Router } from "./Router";

export function HashRouter({ children }) {
  // 与 BrowserRouter 只有这个 API 不一样
  const history = createHashHistory();

  return <Router history={history}>{children}</Router>;
}
