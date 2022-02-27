import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/home/IndexPage";
import { DemoPage } from "./routes/demo/DemoPage";
import { UserPage } from "./routes/user/UserPage";
import { UserPageDynamic } from "./dynamic";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/demo" exact component={DemoPage} />

        {/* <Route path="/user" exact component={UserPage} /> */}
        <Route path="/user" exact component={UserPageDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
