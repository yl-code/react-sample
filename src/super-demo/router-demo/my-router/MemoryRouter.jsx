import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "./Router";

/**
 *
 * createMemoryHistory 这个 API 创建的 history 对象适合在测试环境和非浏览器环境中使用，如：React Native
 *
 * 它在内存中管理路由切换产生的历史记录，不会对地址栏的 url 进行读写
 *
 */
export function MemoryRouter({ children }) {
  // 与 BrowserRouter 只有这个 API 不一样
  const history = createMemoryHistory();

  return <Router history={history}>{children}</Router>;
}
