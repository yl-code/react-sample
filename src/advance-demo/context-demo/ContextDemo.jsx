import React, { Component, PureComponent, useState } from "react";
import { ConsumerPage } from "./ConsumerPage";
import { ThemeContext, UserContext } from "./Context";

import { ContextTypePage } from "./ContextTypePage";
import { UseContextPage } from "./UseContextPage";

export function ContextDemo_1() {
  console.log(ThemeContext, UserContext);

  const [store, setStore] = useState({
    theme: { color: "teal" },
    user: { name: "yl" },
  });

  return (
    <div>
      <button onClick={() => setStore({ ...store, theme: { color: "grey" } })}>
        set theme
      </button>

      <ThemeContext.Provider value={store.theme}>
        <ContextTypePage />
        <UserContext.Provider value={store.user}>
          <UseContextPage />
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export class ContextDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: { color: "teal" },
      user: { name: "yl" },
    };
  }

  render() {
    const { theme, user } = this.state;

    console.log("ContextDemo render");

    return (
      <div>
        <button onClick={() => this.setState({ theme: { color: "grey" } })}>
          set theme
        </button>

        <ThemeContext.Provider value={theme}>
          {/* contextType */}
          <ContextTypePage />

          <UserContext.Provider value={user}>
            {/* Context.Consumer */}
            <ConsumerPage />

            {/* hook 写法就很香 */}
            <UseContextPage />
          </UserContext.Provider>
        </ThemeContext.Provider>

        <hr />

        {/* 这种写法，在 ContextDemo 更新时，只要 value 也就是 this.state.user 没变，就不会导致 Pure 进行更新*/}
        <ThemeContext.Provider value={this.state.user}>
          <Pure />
        </ThemeContext.Provider>
      </div>
    );
  }
}

class Pure extends PureComponent {
  static contextType = ThemeContext;

  render() {
    console.log("render Pure");

    const { name } = this.context;
    return <div style={{ name }}>pure: {name}</div>;
  }
}
