/**
 * 组件 children 的协调逻辑
 */

import { createFiber } from './ReactFiber';
import { isArray, isStringOrNumber, Update } from './utils';

/**
 *
 * 协调 children
 *
 * @param {*} returnFiber 父 fiber
 * @param {*} children 子节点
 */
export function reconcileChildren(returnFiber, children) {
  // 如果是文本、数字，就不需要进行协调处理
  if (isStringOrNumber(children)) {
    return;
  }

  // children 有可能是数组表示的一组节点，也有可能是单个节点
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;

  let oldFiber = returnFiber.alternate && returnFiber.alternate.child; // 拿到 old fibre 节点，判断是否能复用

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i]; // 获取每一个子节点

    if (!newChild) continue;

    const newFiber = createFiber(newChild, returnFiber); // 创建一个 fiber 节点

    // 如果可以复用 oldFiber，则复用
    const same = sameNode(newFiber, oldFiber);
    if (same) {
      Object.assign(newFiber, {
        alternate: oldFiber,
        stateNode: oldFiber.stateNode,
        flags: Update, // 表示这个节点需要更新
      });
    }

    if (!same && oldFiber) {
      deleteChild(returnFiber, oldFiber);
    }

    // 得益于链表结构，这里可以轻松的拿到 oldFiber 的下一个 sibling
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

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

/**
 * 删除不能复用的 fiber 节点
 *
 * @param {*} returnFiber 父 fiber 节点
 * @param {*} childToDelete 将要被删除的 child fiber
 */
function deleteChild(returnFiber, childToDelete) {
  // 先删除 fiber 节点
  // 再删除 dom 节点
  //
  // 这里先将要删除的 child fiber 用数组存起来，在 workLoop 中的 commit 阶段，进行统一删除

  if (Array.isArray(returnFiber.deletions)) {
    returnFiber.deletions.push(childToDelete);
  } else {
    returnFiber.deletions = [childToDelete];
  }
}

/**
 *  粗略判断新老 fiber 节点是否能相同，可以复用
 *
 * @param {*} newFiber
 * @param {*} oldFiber
 * @returns boolean
 */
function sameNode(newFiber, oldFiber) {
  return !!(
    newFiber &&
    oldFiber &&
    newFiber.key === oldFiber.key &&
    newFiber.type === oldFiber.type
  );
}
