/**
 * 处理 fiber 节点的更新
 *
 * wip: work in progress
 *
 */

import { updateHostComponent } from './ReactFiberReconciler';
import { isStr } from './utils';

let wipRoot = null;
let nextUnitOfWork = null; // 就是下一个 fiber 节点

//  fiber 的更新会走到这个方法
export function scheduleUpdateOnFiber(fiber) {
  wipRoot = fiber;
  nextUnitOfWork = fiber;
}

/**
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

function workLoop(IdleDeadline) {
  // 还有下一个任务 && 浏览器处于空闲时期，则执行 preformUnitOfWork
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

/**
 * 任务调度，react 中实现了一个调度库，来根据任务的优先级，来进行调度
 * 这里使用 window.requestIdleCallback 进行模拟
 * 该方法接收一个回掉函数，回掉函数会在浏览器空闲时期被执行
 */
requestIdleCallback(workLoop);
