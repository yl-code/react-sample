import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

export class RouterDemo extends Component {
  render() {
    return (
      <div>
        <h2>react-router-dom demo</h2>

        <BrowserRouter>
          <Link to="/">home</Link> | <Link to="/user">user</Link>
          {/* 
            1、Route 组件渲染内容的三种方式优先级排名：children > component > render
            
            2、children 属性如果接受的是函数，那么它的渲染就不受 location 变化影响

            3、render、component、children 属性为 reactNode 时，渲染会受到 location 的变化所影响

          */}
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
              render={() => <div>home render func</div>}
              children={<div>home children reactNode</div>}
              // children={() => <div>home children func</div>}
            ></Route>
            <Route exact path="/user" component={User}></Route>

            {/* 没有传 path 属性时，不管路是啥都会进行渲染 */}
            <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <h3>Home Page</h3>;
  }
}

class User extends Component {
  render() {
    return <h3>User Page</h3>;
  }
}

class NotFound extends Component {
  render() {
    return <h3>Not Found</h3>;
  }
}
