import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../action";

function LoginPage({ user, location, login }) {
  const { isLogin, loading, err } = user;
  const { from = "/" } = location.state || {};

  const [name, setName] = useState("");

  if (isLogin) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h3>Login Page</h3>
      <hr />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          login({ name });
        }}
      >
        {loading ? "登陆中..." : "点击登陆"}
      </button>
      {err.msg && <p>{err.msg}</p>}
    </div>
  );
}

export const Login = connect(({ user }) => ({ user }), { login })(LoginPage);
