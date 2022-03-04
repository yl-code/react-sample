// vnode 虚拟 dom 节点
// node 真实 dom 节点

const render = (vnode, container) => {
  // 1、vnode => node
  const node = createNode(vnode);

  // 2、node -> container
  container.appendChild(node);
};

/**
 * 接收 vnode，返回 node
 */
const createNode = (vnode) => {
  console.log(vnode);

  // 1、通过 vnode 生成 node
  let node;
  const { type, props } = vnode;

  if (typeof type === 'string') {
    // 原生 HTML 标签
    node = document.createElement(type);
    reconcileChildren(node, props.children);
    updateNode(node, props);
  } else if (typeof type === 'function') {
    // 组件
    // 需要区分 函数组件 与 类组件
    node = type.prototype.isReactComponent
      ? renderClassComponent(vnode)
      : renderFuncComponent(vnode);
  } else {
    // 文本节点
    node = document.createTextNode(vnode);
  }

  return node;
};

/**
 * 渲染类组件
 *
 * 先 new Class 得到 instance
 * 然后执行 instance.render 得到 vnode
 * 最后执行 createNode(vnode) 得到 node
 */
const renderClassComponent = (classObj) => {
  const { type, props } = classObj;
  const instance = new type(props);

  const vnode = instance.render();
  return createNode(vnode);
};

/**
 * 渲染函数组件
 * 直接执行函数，得到 vnode
 * 然后执行 createNode(vnode) 得到 node
 */
const renderFuncComponent = (funcObj) => {
  const { type, props } = funcObj;

  const vnode = type(props);

  return createNode(vnode);
};

/**
 * 将 node 接收的 props 添加到 node 上
 */
const updateNode = (node, props) => {
  Object.keys(props)
    .filter((k) => k !== 'children')
    .forEach((k) => (node[k] = props[k]));
};

/**
 * 遍历 children，将每个 vnode 转成 node，然后插入 parentNode 中
 */
const reconcileChildren = (parentNode, children) => {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    // child 是 vnode，同样需要我们将 vnode 转换为 node，然后将 node 插入到 parentNode 中
    render(child, parentNode);
  }
};

export default { render };
