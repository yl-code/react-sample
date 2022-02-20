import React, { Component, useState } from "react";
// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "./my-router";

export function RouterDemo() {
  const [num, setNum] = useState(1);

  if (num > 3) {
    return <div>num &gt; 3</div>;
  }

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>update num: {num}</button>
      <hr />
      <Router>
        <Link to="/">首页</Link> | <Link to="/user">用户</Link> |
        <Link to="/car/123">车🚗</Link>
        <hr />
        <Switch>
          <Route
            exact
            path="/"
            // children={<Home mode="children" />}
            // children={() => <Home mode="children func" />}
            //
            // component 属性只能接受组件 func/class，不分优先级
            component={Home}
            // component={() => <Home mode="component func" />}
            //
            // render={() => <Home mode="render func" />}
          />
          <Route exact path="/user" component={User} />
          <Route path="/car/:id" component={Car} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

class Home extends Component {
  componentDidMount() {
    console.log("home did mount");
  }

  componentDidUpdate() {
    console.log("home did update");
  }

  componentWillUnmount() {
    console.log("home will unmount");
  }

  render() {
    const { mode = "component" } = this.props;
    return <h3>home Page: {mode}</h3>;
  }
}

class User extends Component {
  componentDidMount() {
    console.log("user did mount");
  }

  componentDidUpdate() {
    console.log("user did update");
  }

  componentWillUnmount() {
    console.log("user will unmount");
  }

  render() {
    return <h3>user Page</h3>;
  }
}

// 传统写法
// function Car({ match }) {
//   const { params, url } = match;
//   return (
//     <div>
//       <h3>car Page -- id: {params.id}</h3>
//       <hr />
//       <Link to={url + "/detail"}>嵌套路由</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

// hook 写法
function Car() {
  const params = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  console.log(params, match, location, history);

  return (
    <div>
      <h3>car Page -- id: {params.id}</h3>
      <hr />
      <Link to={match.url + "/detail"}>嵌套路由</Link>
      <Route path={match.url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail() {
  return <h3>detail</h3>;
}

class NotFound extends Component {
  componentDidMount() {
    console.log("404 did mount");
  }

  componentDidUpdate() {
    console.log("404 did update");
  }

  componentWillUnmount() {
    console.log("404 will unmount");
  }

  render() {
    return <h3>404 Page</h3>;
  }
}
