/**
 * 组件 children 的协调逻辑
 */

import { createFiber } from './ReactFiber';
import { isArray, isStringOrNumber, Placement, Update } from './utils';

/**
 *
 * 协调 children
 *
 * @param {*} returnFiber 父 fiber
 * @param {*} children 子节点，类型是 vDom
 */
// export function reconcileChildren_old(returnFiber, children) {
//   // 如果是文本、数字，就不需要进行协调处理
//   if (isStringOrNumber(children)) {
//     return;
//   }

//   // children 有可能是数组表示的一组节点，也有可能是单个节点
//   const newChildren = isArray(children) ? children : [children];
//   let previousNewFiber = null;

//   let oldFiber = returnFiber.alternate && returnFiber.alternate.child; // 拿到 old fibre 节点，判断是否能复用

//   for (let i = 0; i < newChildren.length; i++) {
//     const newChild = newChildren[i]; // 获取每一个子节点

//     if (!newChild) continue;

//     const newFiber = createFiber(newChild, returnFiber); // 创建一个 fiber 节点

//     // 如果可以复用 oldFiber，则复用
//     const same = sameNode(newFiber, oldFiber);
//     if (same) {
//       Object.assign(newFiber, {
//         alternate: oldFiber,
//         stateNode: oldFiber.stateNode,
//         flags: Update, // 表示这个节点需要更新
//       });
//     }

//     if (!same && oldFiber) {
//       deleteChild(returnFiber, oldFiber);
//     }

//     // 得益于链表结构，这里可以轻松的拿到 oldFiber 的下一个 sibling
//     if (oldFiber) {
//       oldFiber = oldFiber.sibling;
//     }

//     if (previousNewFiber === null) {
//       // 第一轮创建的 fiber 节点，是 returnFiber(父 fiber)节点的第一个子节点
//       returnFiber.child = newFiber;
//     } else {
//       // 后面每轮创建的 fiber 节点，都是前面一轮创建的 fiber 节点的兄弟节点
//       // 因此，前面一轮的 fiber 节点的 sibling 属性，指向当前轮次的 fiber 节点
//       previousNewFiber.sibling = newFiber;
//     }

//     previousNewFiber = newFiber;
//   }
// }

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

  if (isArray(returnFiber.deletions)) {
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

/**
 * 更新 new fiber 的位置，并返回上一次插入节点的位置
 *
 * @param {*} newFiber 当前需要插入的 new fiber 节点
 * @param {number} lastPlacedIndex 上一次插入节点的位置
 * @param {number} newIdx 当前节点的位置
 * @param {boolean} shouldTrackSideEffects 是否为更新阶段
 * @returns
 */
function placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects) {
  newFiber.index = newIdx;
  if (!shouldTrackSideEffects) {
    // 初次渲染阶段，则直接返回
    return lastPlacedIndex;
  }

  // 与当前 new Fiber 相对的 old fiber
  const current = newFiber.alternate;
  if (current) {
    // 有 old fiber
    // 拿到之前的索引位置
    const oldIndex = current.index;

    if (oldIndex < lastPlacedIndex) {
      // move
      newFiber.flags = Placement;

      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    // 没有 old fiber
    newFiber.flags = Placement;

    return lastPlacedIndex;
  }
}

/**
 * 删除多余的 old fiber
 *
 * @param {*} returnFiber 父 fiber
 * @param {*} oldFiber 待删除的子 fiber 链表的头节点
 */
function deleteRemainingChildren(returnFiber, oldFiber) {
  let childToDelete = oldFiber; // 头指针

  while (childToDelete) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

/**
 * 将 fiber 链表，转换为 map 结构
 * 其中 key 为 fiber 节点的 key 或者为节点的位置坐标 index
 * value 为 fiber 节点本身
 *
 * @param {*} currentFirstChild fiber 链表
 * @returns 返回 map 结构的 fiber
 */
function mapRemainingChildren(currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild; // 头指针

  while (existingChild) {
    existingChildren.set(
      existingChild.key || existingChild.index,
      existingChild
    );

    existingChild = existingChild.sibling;
  }

  return existingChildren;
}

/**
 *
 * 协调 children
 *
 * @param {*} returnFiber 父 fiber
 * @param {*} children 子节点，类型是 vDom
 */
export function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) return;

  // 将单个子节点转为数组，方便后面统一循环处理子节点
  const newChildren = isArray(children) ? children : [children];

  // 判断当前是初次渲染阶段，还是更新阶段，true 为更新阶段
  const shouldTrackSideEffects = !!returnFiber.alternate;

  // 记录上一个 new fiber 节点
  let previousNewFiber = null;

  // 记录下一个 old fiber 节点
  let nextOldFiber = null;

  // 记录上一次插入节点的位置
  let lastPlacedIndex = 0;

  let newIdx = 0;

  // 取到第一个 old child fiber 节点
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;

  // 下面统一的循环处理子节点

  // 从头开始遍历，找到第一个不能复用的节点
  for (; !!oldFiber && newIdx < newChildren.length; newIdx++) {
    const newChild = newChildren[newIdx];

    if (!newChild) continue;

    // 节点位置发生变更
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }

    const same = sameNode(newChild, oldFiber);

    // 不能复用时
    if (!same) {
      if (!oldFiber) {
        oldFiber = nextOldFiber; // 找到了第一个不能复用的节点了
      }
      break;
    }

    // 能复用就，创建 new fiber
    const newFiber = createFiber(newChild, returnFiber);
    Object.assign(newFiber, {
      alternate: oldFiber,
      stateNode: oldFiber.stateNode,
      flags: Update,
    });

    // 记录上次插入节点的位置
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );

    // 下面连接 sibling fiber
    if (!previousNewFiber) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;

    // ! 切换
    oldFiber = nextOldFiber;
  }

  // old 1 2 3 4 5 6 7
  // new 1 2 3 4
  //
  // 此时只需要删除多余的 old fiber
  if (newIdx === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return;
  }

  // old 1 2 3 4
  // new 1 2 3 4 5 6 7
  //
  // 没有 oldFiber，表示当前为【初次渲染】或者【新增节点】
  if (!oldFiber) {
    for (; newIdx < newChildren.length; newIdx++) {
      const newChild = newChildren[newIdx];
      if (!newChild) continue;

      const newFiber = createFiber(newChild, returnFiber);

      // 记录上次插入的节点位置
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIdx,
        shouldTrackSideEffects
      );

      // 下面连接 sibling 节点
      if (!previousNewFiber) {
        returnFiber.child = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
    }

    return;
  }

  // old 1 2 3 4
  // new 1 5 4 3 8
  //
  // 下面将 fiber 链表转换为 fiber map
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; newIdx < newChildren.length; newIdx++) {
    const newChild = newChildren[newIdx];
    if (!newChild) continue;

    const newFiber = createFiber(newChild, returnFiber);
    // 记录上次插入的节点位置
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );

    // 在上面生成的 fiber map 中查找
    let matchedFiber = existingChildren.get(newFiber.key || newFiber.index);
    if (matchedFiber) {
      existingChildren.delete(newFiber.key || newFiber.index);
      Object.assign(newFiber, {
        alternate: matchedFiber,
        stateNode: matchedFiber.stateNode,
        flags: Update,
      });
    }

    if (!previousNewFiber) {
      returnFiber.child = previousNewFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  // 当前为更新阶段时，删除 map 中剩余的 无用 oldFiber
  if (shouldTrackSideEffects) {
    existingChildren.forEach((child) => deleteChild(returnFiber, child));
  }
}
