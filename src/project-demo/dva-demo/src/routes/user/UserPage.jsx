import { connect } from "dva";
import React, { Component } from "react";

@connect(
  (state) => {
    console.log("user all state: ", state);

    return { user: state.user };
  },
  {
    changeTitle: (payload) => ({ type: "user/changeTitle", payload }),
  }
)

// dynamic 文件夹中动态导入，需要这里使用 default 默认导出
export default class UserPage extends Component {
  render() {
    const { user, changeTitle } = this.props;
    return (
      <div>
        <h1>UserPage</h1>
        <button onClick={() => changeTitle(Date.now())}>{user.title}</button>
      </div>
    );
  }
}
