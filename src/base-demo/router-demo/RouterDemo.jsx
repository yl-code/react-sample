import React, { Component, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

export class RouterDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    };
  }

  render() {
    return (
      <div>
        <h2>react-router-dom demo</h2>

        <button onClick={() => this.setState({ num: 1 })}>
          num: {this.state.num}
        </button>

        <hr />

        <BrowserRouter>
          <Link to="/">home</Link> | <Link to="/user">user</Link>
          {/* 

            1、Route 组件渲染内容的三种方式优先级排名：children > component > render
            
            2、children 属性如果接受的是函数，且外层没有用 Switch 组件进行包裹时，那么它的渲染就不受 location 变化影响

            3、render、component、children 属性为 组件 时，渲染会受到 location 的变化所影响

          */}
          <Switch>
            <Route
              exact
              path="/"
              // 1、component 接收组件的写法，在 RouterDemo 这个父组件更新时，只会初始挂载一次，后面都会进行更新
              // component={Home}
              // 2、component 接收匿名函数的写法，在 RouterDemo 这个父组件更新时，会反复挂载卸载 Home 组件，性能堪忧
              // component={() => <Home />}
              // component={() => <UserFuncCom />}

              // 3、对比上面 component 属性接收匿名函数的情况，render 这样写，就不会导致其接收的组件反复渲染
              // render={() => <Home />}
              // render={() => <UserFuncCom />}

              children={<Home />}
              // children={() => <Home />}
              // children={() => <UserFuncCom />}
            >
              {() => <Home />}
            </Route>
            <Route exact path="/user" component={() => <UserFuncCom />} />
            {/* 

              不使用 Switch 组件包裹时，且没有传 path 属性时，不管路是啥都会进行渲染 

            */}
            <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
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
    return <h3>Home Page</h3>;
  }
}

// class User extends Component {
//   render() {
//     return <h3>User Page</h3>;
//   }
// }

function UserFuncCom() {
  useEffect(() => {
    console.log("user did mount");

    return () => {
      console.log("user will unmount");
    };
  }, []);

  return <h3>User Page</h3>;
}

class NotFound extends Component {
  render() {
    return <h3>Not Found</h3>;
  }
}
