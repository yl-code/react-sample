import React, { Component } from "react";

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 10,
    };
  }

  displayFn() {
    console.log(this.state.num);
  }

  render() {
    return (
      <div>
        <button onClick={this.displayFn.bind(this)}>test</button>
      </div>
    );
  }
}
