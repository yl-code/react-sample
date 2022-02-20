import React, { Component, useState } from "react";

export function Test() {
  const [num, setNum] = useState(1);

  return (
    <div>
      <h1>Test</h1>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        num: {num}
      </button>
      <Sub />

      <Child />
    </div>
  );
}

const Sub = () => {
  console.log(123);
  return <div>sub</div>;
};

class Child extends Component {
  componentDidMount() {
    console.log("child mount");
  }

  componentDidUpdate() {
    console.log("child update");
  }

  componentWillUnmount() {
    console.log("child will unmount");
  }

  render() {
    console.log("child render");

    return <div>child</div>;
  }
}
