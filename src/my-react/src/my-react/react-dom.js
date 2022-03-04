// vnode 虚拟 dom 节点
// node 真实 dom 节点

const render = (vnode, container) => {
  // console.log(vnode, container);

  // 1、vnode => node
  const node = createNode(vnode);

  // 2、node -> container
  container.appendChild(node);
};

const createNode = (vnode) => {
  console.log(vnode);

  // 1、通过 vnode 生成 node
  const { type } = vnode;

  return document.createElement(type);
};

export default { render };
