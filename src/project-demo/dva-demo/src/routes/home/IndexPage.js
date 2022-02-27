import React from "react";
import { connect } from "dva";
import { Link } from "dva/router";

function IndexPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home Page</h1>
      <hr />
      <Link to="/demo">To Demo Page</Link>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
