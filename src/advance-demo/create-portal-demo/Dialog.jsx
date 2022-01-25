import React, { Component } from "react";
import { createPortal } from "react-dom";

export class Dialog extends Component {
  constructor(props) {
    super(props);

    this.node = document.createElement("div");
    this.node.className = "my-class-dialog";
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    this.node && document.body.removeChild(this.node);
  }

  render() {
    const { onClose } = this.props;

    return createPortal(
      <div
        className="content"
        style={{
          width: 200,
          height: 200,
          border: "1px solid grey",
          margin: "40px auto",
        }}
      >
        <h3 style={{ cursor: "pointer" }} onClick={onClose}>
          关闭 Class Dialog
        </h3>
      </div>,
      this.node
    );
  }
}
