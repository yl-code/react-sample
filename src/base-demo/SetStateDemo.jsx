/**
 * 总共 6 点，setState 用法 demo
 */

import React, { Component } from "react";

export class SetStateDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  componentDidMount() {
    // 4
    // 在原生事件中，使用 setState，会立即更新 count
    const btn = document.querySelector(".nativeEventBtn");
    btn.onclick = () => {
      this.setState({ count: this.state.count + 1 });

      console.log(this.state.count);
    };
  }

  render() {
    let { count } = this.state;

    return (
      <div>
        <button
          onClick={() => {
            // 1
            // 直接修改 this.state.count
            this.state.count++;
            console.log("count 的值改了，但是视图没有更新", this.state);
          }}
        >
          为什么直接修改 this.state.count 不会触发视图更新， {count}
        </button>

        <hr />
        <button
          onClick={() => {
            // 2
            // 这里没法通过 this.state.count 获取上一步设置的最新的 count
            // 原因是：setState 在 react 的合成事件和生命周期函数中会有一个批量更新的操作，所以不会立即更新 count
            // 而在原生事件中和 setTimeout 中是同步的

            this.setState({ count: ++count }, () => {
              // 2.1
              // 可以通过 setState 的回掉函数拿到，更新完成之后的 state
              console.log(this.state);
            });

            console.log(this.state.count);
          }}
        >
          需要使用 setState 修改 state，才会触发视图更新， {count}
        </button>

        <hr />
        <button
          onClick={() => {
            // 3
            // 在 setTimeout 中，使用 setState，会立即更新 count
            setTimeout(() => {
              this.setState({ count: count + 1 });

              console.log(this.state.count);
            });
          }}
        >
          在 setTimeout 中使用 setState， {count}
        </button>

        <hr />
        <button className="nativeEventBtn">在原生事件里面使用 setState， {count}</button>

        <hr />
        <button
          onClick={() => {
            // 5
            // 多次 state 的更新会被合并
            this.setState({ count: this.state.count + 1 });
            this.setState({ count: this.state.count + 2 });
            // this.setState({ count: count + 1 });
            // this.setState({ count: count + 2 });
          }}
        >
          state 的更新会被合并，每次点击，count 只会 +2， {count}
        </button>

        <hr />
        <button
          onClick={() => {
            // 6
            // 在 setState 第一个参数位置，传入一个函数
            // 该函数接收的第一个参数是 上一次更新后的 state，返回一个对象用于更新 state
            this.setState((state) => {
              return { count: state.count + 1 };
            });
            this.setState((state) => {
              return { count: state.count + 2 };
            });
          }}
        >
          现在就是每次点击，count 都会 +3， {count}
        </button>
      </div>
    );
  }
}
