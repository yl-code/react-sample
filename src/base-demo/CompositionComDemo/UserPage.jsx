import React, { Component } from "react";
import { Layout } from "./components/Layout";

export class UserPage extends Component {
  render() {
    return (
      <Layout showHeader={false} showFooter={true} title="User Page">
        {/* 不具名写法，直接写 jsx，作为 Layout 的 children */}
        {/* <h3>这是 User Page </h3> */}

        {/* 具名写法，传递一个对象作为 Layout 的 children */}
        {{
          content: <h3>这是 Home Page </h3>,
          txt: "类似于 Vue 中的具名插槽",
          btnClick: () => console.log("user page btnClick"),
        }}
      </Layout>
    );
  }
}
