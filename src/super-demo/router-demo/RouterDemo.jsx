import React, { Component, useEffect, useRef, useState } from "react";

// import {
//   // BrowserRouter as Router,
//   HashRouter as Router,
//   // MemoryRouter as Router,
//   Link,
//   NavLink,
//   Prompt,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
//   useLocation,
//   useParams,
//   useRouteMatch,
//   withRouter,
// } from "react-router-dom";

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  // MemoryRouter as Router,
  Link,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter,
} from "./my-router";

export function RouterDemo() {
  // 用于验证 NavLink 与 Link 组件的 forwardRef 转发是否成功
  const navLinkRef = useRef();
  useEffect(() => {
    // console.log(navLinkRef);
  }, []);

  // 用于更新组件
  const [num, setNum] = useState(1);
  if (num > 3) {
    return <div>num &gt; 3</div>;
  }

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>update num: {num}</button>
      <hr />
      <Router>
        {/* 
          <Link to="/">首页</Link> | <Link to="/user">用户</Link> |
          <Link to="/car/123">车</Link> 
        */}
        <NavLink to="/">首页</NavLink> | <NavLink to="/user">用户</NavLink> |
        <NavLink to="/car/123" ref={navLinkRef} activeClassName="active-class">
          车
        </NavLink>
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
          <Route
            exact
            path="/user"
            render={(props) => <User {...props} flag={num % 2 === 1} />}
          />
          <Route path="/car/:id" render={() => <Car />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////

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
    // 测试 Redirect 组件功能，直接重定向到 /welcome
    // 由于没有定义 /welcome 路径，所以页面会渲染 404 组件
    return <Redirect to="/welcome" />;

    const { mode = "component" } = this.props;
    return <h3>home Page: {mode}</h3>;
  }
}

//////////////////////////////////////////////////////////////////////////////////

class User extends Component {
  // componentDidMount() {
  //   console.log("user did mount");
  // }

  // componentDidUpdate() {
  //   console.log("user did update");
  // }

  // componentWillUnmount() {
  //   console.log("user will unmount");
  // }

  render() {
    // console.log("user render", this.props);

    return (
      <div>
        <h3>user Page: {`${this.props.flag}`}</h3>
        <Link to="/">首页</Link>
        <Prompt when={this.props.flag} message="确定要离开 user 页面吗？" />

        <OtherCom />
      </div>
    );
  }
}

// 其他不是通过 Route 组件进行渲染的子孙组件，也需要拿到最近的路由匹配结果时，可以使用 withRouter
@withRouter
class OtherCom extends Component {
  render() {
    return <div>other component：withRouter：「 {this.props.match.url} 」</div>;
  }
}

//////////////////////////////////////////////////////////////////////////////////

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
      <Link to={match.url + "/detail"}>嵌套路由 Detail</Link>
      <Route path={match.url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail() {
  return <h3>detail</h3>;
}

//////////////////////////////////////////////////////////////////////////////////

class NotFound extends Component {
  // componentDidMount() {
  //   console.log("404 did mount");
  // }

  // componentDidUpdate() {
  //   console.log("404 did update");
  // }

  // componentWillUnmount() {
  //   console.log("404 will unmount");
  // }

  render() {
    return <h3>404 Page {this.props.num}</h3>;
  }
}
