import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function DialogHook(props) {
  const { onClose } = props;

  const node = document.createElement("div");
  node.className = "my-func-dialog";

  useEffect(() => {
    document.body.appendChild(node); //组件挂载时，添加 node

    return () => {
      document.body.removeChild(node); // 组件卸载时，将 node 移除
    };
  }, []);

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
        关闭 Func Dialog
      </h3>
    </div>,
    node
  );
}
