import React, { Component } from "react";
import { Dialog } from "./Dialog";
import DialogHook from "./DialogHook";

export class CreatePortalDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  setVisible = (visible) => this.setState({ visible });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <h2>CreatePortalDemo</h2>
        <button
          onClick={() => {
            this.setVisible(!visible);
          }}
        >
          Toggle Dialog
        </button>

        {visible && (
          <Dialog
            onClose={() => {
              this.setVisible(false);
            }}
          ></Dialog>
        )}

        {visible && (
          <DialogHook
            onClose={() => {
              this.setVisible(false);
            }}
          ></DialogHook>
        )}
      </div>
    );
  }
}
