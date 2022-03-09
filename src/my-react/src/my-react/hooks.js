import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop';
import { isFn } from './utils';

let currentlyRenderingFiber = null; // 当前进行渲染的 fiber 节点
let workInProgressHook = null; // 函数组件中的 hook 是以链表的形式，按顺序存储在 fiber 节点上，这就是链表的尾指针

export function useReducer(reducer, initialState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染
    hook.memorizedState = initialState;
  }

  const dispatch = () => {
    hook.memorizedState = reducer(hook.memorizedState);
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };
  return [hook.memorizedState, dispatch];
}

export function useState(initialState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 还没有，old fiber，就表示是函数组件的初次渲染
    hook.memorizedState = initialState;
  }

  const setState = (newState) => {
    const memorizedState = isFn(newState)
      ? newState(hook.memorizedState)
      : newState;

    // 优化，当 state 没变时，不进行更新
    if (hook.memorizedState !== memorizedState) {
      hook.memorizedState = memorizedState;
      scheduleUpdateOnFiber(currentlyRenderingFiber);
    }
  };

  return [hook.memorizedState, setState];
}

function updateWorkInProgressHook() {
  let hook;
  let alternate = currentlyRenderingFiber.alternate; // alternate 指向的就是更新之前的 old fiber 节点

  if (alternate) {
    // 更新阶段，需要拿到更新之前的 hook state 链表，按照指针的位置进行返回对应的节点

    // 先将 old fiber 节点的 hook state 链表，赋值给当前的 new fiber 节点
    currentlyRenderingFiber.memorizedState = alternate.memorizedState;

    if (workInProgressHook) {
      // 指针存在，则其指向的节点则是上一个 hook state 节点
      workInProgressHook = workInProgressHook.next;
    } else {
      // 指针不存在，则表示需要将头节点返回，将尾指针指向头节点
      workInProgressHook = currentlyRenderingFiber.memorizedState;
    }

    hook = workInProgressHook; // 将当前 workInProgressHook 指针指向的 hook state 节点返回
  } else {
    // 初次渲染阶段，需要创建一条新的 hook state 链表，
    hook = {
      memorizedState: null, // hook 的状态值
      next: null, // 指向下一个 hook 的状态值
    };

    // 下面将 hook 节点接到链表末尾
    if (workInProgressHook) {
      // 尾指针存在，表示其指向的就是链表的末尾，则需要将当前 hook 节点接上去
      workInProgressHook.next = hook;

      // 更新尾指针
      workInProgressHook = workInProgressHook.next;
    } else {
      // 尾指针不存在，当前 hook 节点为头节点
      currentlyRenderingFiber.memorizedState = hook;

      // 更新尾指针
      workInProgressHook = currentlyRenderingFiber.memorizedState;
    }
  }

  return hook;
}

/**
 * 在 updateFunctionComponent 中，获取到当前需要更新的 fiber 节点
 *
 * @param {*} wip 当前组件的 fiber 节点对象
 */
export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memorizedState = null; // hook 链表的头节点
  workInProgressHook = null; // hook 链表的尾指针，初始状态为 null
}
