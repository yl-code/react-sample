import { createFiber } from './ReactFiber';
import { isArray, isStr, updateNode } from './utils';

/**
 * 更新原生组件，也就是原生 HTML 标签
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateHostComponent(wip) {
  // 如果没有 stateNode，也就是没有当前 fiber 的原生节点，就表示当前是初次渲染
  // 需要给它创建一个 stateNode
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);

    updateNode(wip.stateNode, wip.props); // 更新节点的属性，包括 children
  }

  reconcileChildren(wip, wip.props.children);

  // console.log('--- wip ---', wip);
}

/**
 * 渲染 Fragment 组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

/**
 * 更新函数组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateFunctionComponent(wip) {
  const children = wip.type(wip.props);

  reconcileChildren(wip, children);
}

/**
 * 更新函数组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateClassComponent(wip) {
  const { props, type } = wip;
  const instance = new type(props);
  const children = instance.render();

  reconcileChildren(wip, children);
}

/**
 *
 * 协调 children
 *
 * @param {*} returnFiber 父 fiber
 * @param {*} children 子节点
 */
function reconcileChildren(returnFiber, children) {
  // 如果是文本节点，就不需要进行协调处理
  if (isStr(children)) {
    return;
  }

  // children 有可能是数组表示的一组节点，也有可能是单个节点
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i]; // 获取每一个子节点

    const newFiber = createFiber(newChild, returnFiber); // 创建一个 fiber 节点

    if (previousNewFiber === null) {
      // 第一轮创建的 fiber 节点，是 returnFiber(父 fiber)节点的第一个子节点
      returnFiber.child = newFiber;
    } else {
      // 后面每轮创建的 fiber 节点，都是前面一轮创建的 fiber 节点的兄弟节点
      // 因此，前面一轮的 fiber 节点的 sibling 属性，指向当前轮次的 fiber 节点
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}