import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function LoginGuard({ isLogin, path, component: RealComponent, ...arg }) {
  return (
    <Route
      {...arg}
      path={path}
      render={(props) => {
        return isLogin ? (
          <RealComponent {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: path } }} />
        );
      }}
    />
  );
}

export const PrivateRoute = connect(({ user }) => ({ isLogin: user.isLogin }))(
  LoginGuard
);
// export const PrivateRoute = LoginGuard;
