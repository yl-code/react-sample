import React, { useCallback, useContext } from "react";
import { RouterContext } from "./RouterContext";

export function Link({ to, children }) {
  const { history } = useContext(RouterContext);

  const click = useCallback((e) => {
    e.preventDefault();
    history.push(to);
  }, []);

  return (
    <a href={to} onClick={click}>
      {children}
    </a>
  );
}
