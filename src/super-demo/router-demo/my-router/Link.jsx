import React, { forwardRef, useCallback, useContext } from "react";
import { RouterContext } from "./RouterContext";
import { matchPath } from "./utils";

export const Link = forwardRef(({ to, children, ...otherProps }, ref) => {
  const { history } = useContext(RouterContext);

  const click = useCallback((e) => {
    e.preventDefault();

    history.push(to);
  }, []);

  return (
    <a href={to} {...otherProps} onClick={click} ref={ref}>
      {children}
    </a>
  );
});

export const NavLink = forwardRef(
  ({ activeClassName = "active", ...otherProps }, ref) => {
    const { location } = useContext(RouterContext);

    const match = matchPath(location.pathname, {
      path: otherProps.to,
      exact: true, // 路径是否完全匹配
      sensitive: true, // 大小写是否敏感
      strict: true, // 路径后面是否带上斜杠 /
    });

    return (
      <Link
        className={match ? activeClassName : ""}
        {...otherProps}
        ref={ref}
      />
    );
  }
);
