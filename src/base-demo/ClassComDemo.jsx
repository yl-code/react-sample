/**
 * 用 class 组件完成 clock demo
 *
 */
import React, { Component } from "react";

export class ClassComDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clock: Date(),
    };

    this.timer = null;
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({ clock: Date() });
    }, 1000);
  }

  componentDidUpdate() {
    console.log("update", this.state.clock);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { clock } = this.state;
    return <div>{clock.toString()}</div>;
  }
}
