import React, { Component } from "react";
import { connect } from "react-redux";

class Demo extends Component {
  render() {
    const { add, num } = this.props;
    console.log(this.props);
    return (
      <div>
        <button onClick={add}>num: {num}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  num: state,
});

const mapDispatchToProps = {
  add() {
    return { type: "ADD" };
  },
};

export const ReactReduxDemo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);
