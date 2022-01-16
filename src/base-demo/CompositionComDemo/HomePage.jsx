import React, { Component } from "react";
import { Layout } from "./components/Layout";

export class HomePage extends Component {
  render() {
    return (
      <Layout showHeader={true} showFooter={false} title="Home Page">
        {/* 不具名写法，直接写 jsx，作为 Layout 的 children */}
        {/* <h3>这是 Home Page </h3> */}

        {/* 具名写法，传递一个对象作为 Layout 的 children */}
        {{ content: <h3>这是 Home Page </h3> }}
      </Layout>
    );
  }
}
