import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { User } from "../pages/User";

export function Routes() {
  return (
    <Router>
      <Link to="/">首页</Link> | <Link to="/user">用户</Link> |
      <Link to="/login">登陆</Link>
      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
