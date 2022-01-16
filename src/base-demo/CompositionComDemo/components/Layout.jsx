import React, { Component } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export class Layout extends Component {
  componentDidMount() {
    const { title } = this.props;
    document.title = title;
  }

  render() {
    const { children, showHeader, showFooter } = this.props;
    return (
      <div>
        {showHeader && <Header></Header>}
        {/* 不具名写法 */}
        {/* {children} */}

        {/* 具名写法，上层组件传递一个对象进来 */}
        {children.content}
        {children.txt && <button onClick={children.btnClick}>{children.txt}</button>}

        {showFooter && <Footer></Footer>}
      </div>
    );
  }
}
