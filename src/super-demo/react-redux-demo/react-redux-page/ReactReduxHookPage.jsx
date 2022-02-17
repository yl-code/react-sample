import React, { useCallback } from "react";
import { useDispatch, useSelector } from "./my-react-redux";

// import { useDispatch, useSelector } from "react-redux";

export function ReactReduxHookPage(props) {
  const count = useSelector((state) => state);

  const dispatch = useDispatch();
  const add = useCallback(() => dispatch({ type: "ADD" }), []);

  return (
    <div>
      <button onClick={add}>count add: {count}</button>
    </div>
  );
}
