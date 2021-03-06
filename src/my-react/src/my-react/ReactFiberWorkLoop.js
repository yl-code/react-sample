/**
 * 处理 fiber 节点的更新
 *
 * 名词解释：
 * wip === work in progress
 *
 */

import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
} from './ReactFiberReconciler';
import { scheduleCallback, shouldYield } from './Scheduler';
import {
  HookLayout,
  isFn,
  isStr,
  isSymbol,
  Placement,
  Update,
  updateNode,
} from './utils';

let wipRoot = null;
let nextUnitOfWork = null; // 就是下一个 fiber 节点

//  fiber 的更新会走到这个方法
export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = { ...fiber };

  wipRoot = fiber;
  nextUnitOfWork = fiber;

  /**
   * 任务调度，react 中实现了一个调度库，来根据任务的优先级，来进行调度
   * 这里使用 window.requestIdleCallback 进行模拟
   * 该方法接收一个回掉函数，回掉函数会在浏览器空闲时期被执行
   */
  // window.requestIdleCallback(workLoop);

  // 下面是实现的简版调度库 Scheduler
  scheduleCallback(workLoop);
}

// // workLoop 1
// function workLoop(IdleDeadline) {
//   // 1、更新 fiber
//   // 还有下一个任务 && 浏览器处于空闲时期，则执行 preformUnitOfWork
//   while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
//     nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
//   }

//   // 2、提交 fiber
//   // fiber 是一个链表结构，所以在协调完成之后，只用提交根节点即可
//   if (!nextUnitOfWork && wipRoot) {
//     commitRoot();
//   }
// }

// // workLoop 2
function workLoop() {
  // 1、更新 fiber
  // 还有下一个任务 && 时间切片还有余量，则可以执行 preformUnitOfWork
  while (nextUnitOfWork && !shouldYield()) {
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
  }

  // 2、提交 fiber
  // fiber 是一个链表结构，所以在协调完成之后，只用提交根节点即可
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

/**
 * 更新整个 fiber 链表
 *
 * @param {*} wip 接收当前需要更新的 fiber 节点
 * @returns 返回下一个需要更新的 fiber 节点
 */
function preformUnitOfWork(wip) {
  // 1、更新 wip
  const { type } = wip;
  switch (true) {
    case isStr(type):
      updateHostComponent(wip);
      break;
    case isFn(type):
      if (type.prototype.isReactComponent) {
        updateClassComponent(wip);
      } else {
        updateFunctionComponent(wip);
      }

      break;
    // case isSymbol(type): // 粗略判断 Fragment 的类型
    //   updateFragmentComponent(wip);
    //   break;
    default:
      break;
  }

  /**
   * 2、返回下一个将要更新的节点
   *
   * 使用深度优先遍历的方式，遍历 fiber 链表的每个节点
   *
   * child 指向当前节点的 第一个子节点
   * sibling 指向当前节点的 下一个兄弟节点
   * return 指向当前节点的 父节点
   *
   */
  if (wip.child) {
    // 如果有子节点，就直接返回子节点
    return wip.child;
  }

  // 没有子节点，就开始找兄弟节点
  let next = wip;
  while (next) {
    // 有兄弟节点，则直接返回
    if (next.sibling) {
      return next.sibling;
    }
    // 没有兄弟节点，则将 next 指针指向其父节点，然后找当前节点的叔叔辈的节点
    next = next.return;
  }

  // 遍历完所以节点之后，返回 null
  return null;
}

/**
 * 提交 fiber
 *
 * wipRoot 是 container
 * container 不需要更新，所以从他的 child 开始提交
 * 提交完之后，将 wipRoot 置为 null，防止多次提交
 */
function commitRoot() {
  // commitWorker(wipRoot.child);

  isFn(wipRoot.type) ? commitWorker(wipRoot) : commitWorker(wipRoot.child);

  wipRoot = null;
}

/**
 * 真正开始提交更新的函数，递归提交
 *
 * @param {*} wip 接收的 fiber 节点
 */
function commitWorker(wip) {
  if (!wip) return false;

  // 1、提交当前节点
  const { type, stateNode, flags } = wip;

  // fiber 节点可能没有父级 dom 节点，比如函数组件、类组件，所以不能直接这么写
  // const parentNode = wip.return.stateNode;
  const parentNode = getParentNode(wip.return);

  if (flags & Placement && stateNode) {
    let hasSiblingNode = foundSiblingNode(wip, parentNode);
    if (hasSiblingNode) {
      // 更新阶段的新增
      parentNode.insertBefore(stateNode, hasSiblingNode);
    } else {
      // 初次渲染阶段的新增
      parentNode.appendChild(stateNode);
    }
  }

  if (flags & Update && stateNode) {
    // 更新
    updateNode(stateNode, wip.alternate.props, wip.props);
  }

  if (Array.isArray(wip.deletions)) {
    // 删除
    commitDeletions(wip.deletions, stateNode || parentNode);

    wip.deletions = null;
  }

  if (isFn(type)) {
    invokeHooks(wip);
  }

  // 2、提交子节点
  commitWorker(wip.child);

  // 3、提交兄弟节点
  commitWorker(wip.sibling);
}

function commitDeletions(deletions, parentNode) {
  deletions.forEach((childFiber) => {
    // 删除 dom 节点的两种方式
    // parentNode.removeChild(getStateNode(childFiber));
    getStateNode(childFiber).remove();
  });
}

function getStateNode(fiber) {
  let temp = fiber;

  while (!temp.stateNode) {
    temp = temp.child;
  }

  return temp.stateNode;
}

function invokeHooks(wip) {
  const { updateQueue } = wip;

  for (let i = 0; i < updateQueue.length; i++) {
    const { create, hookFlags } = updateQueue[i];

    if (hookFlags === HookLayout) {
      create();
    } else {
      scheduleCallback(create);
    }
  }
}

/**
 * 查找父级 dom 节点
 *
 * @param {*} fiber 接收 fiber 节点
 * @returns 返回 dom 节点
 */
function getParentNode(fiber) {
  while (fiber) {
    if (fiber.stateNode) {
      return fiber.stateNode;
    }

    fiber = fiber.return;
  }
}

/**
 * 找到当前 fiber 节点的下一个存在的兄弟节点
 * 并返回其 dom 对象
 *
 * @param {*} fiber 当前 fiber 节点
 * @param {*} parentNode 当前 fiber 节点的父 dom
 * @returns sibling dom
 */
function foundSiblingNode(fiber, parentNode) {
  let siblingHasNode = fiber.sibling;
  let node = null;
  while (siblingHasNode) {
    node = siblingHasNode.stateNode;

    if (node && parentNode.contains(node)) {
      return node;
    }

    siblingHasNode = siblingHasNode.sibling;
  }

  return null;
}
