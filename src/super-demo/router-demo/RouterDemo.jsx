import React, { Component } from "react";

export function RouterDemo() {
  return <div>RouterDemo</div>;
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
    return <h3>home Page</h3>;
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
