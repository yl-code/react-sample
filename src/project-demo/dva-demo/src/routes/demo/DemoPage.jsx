import React, { Component } from "react";
import { Link } from "dva/router";
import { Table } from "antd";
import { connect } from "dva";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "city",
    key: "city",
  },
];

@connect(
  (state) => {
    console.log("demo all state: ", state);
    return { demo: state.demo };
  },
  {
    getTableData: (payload) => ({ type: "demo/getTableData", payload }),
  }
)
export class DemoPage extends Component {
  getTableData = () => {
    this.props.getTableData("demo params");
  };

  render() {
    console.log(this.props);

    const { data } = this.props.demo;

    return (
      <div style={{ textAlign: "center" }}>
        <h1>DemoPage</h1>
        <hr />
        <Link to="/">To Home Page</Link>
        <hr />
        <button onClick={this.getTableData}>Get Data</button>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
  }
}
