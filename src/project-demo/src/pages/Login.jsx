import React from "react";
import { Redirect } from "react-router-dom";

export function Login({ isLogin, location }) {
  const { from = "/" } = location.state || {};
  if (isLogin) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h3>Login Page</h3>
      <hr />
      <button>点击登陆</button>
    </div>
  );
}
