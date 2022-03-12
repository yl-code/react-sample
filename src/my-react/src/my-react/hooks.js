import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop';
import { areHookInputsEqual, isFn, HookLayout, HookPassive } from './utils';

// 当前进行渲染的 fiber 节点
let currentlyRenderingFiber = null;

// 函数组件中的 hook 是以链表的形式，按顺序存储在 fiber 节点上，这就是链表的尾指针
let workInProgressHook = null;

// 指向当前 hook 对象的指针, 函数组件初次渲染时，置为 null，更新时，会根据需要依次执行 hook 链表的每个节点
// 也就是与 workInProgressHook 对应位置的老 hook 对象
let currentHook = null;

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

      currentHook = currentHook.next;
    } else {
      // 指针不存在，则表示需要将头节点返回，将尾指针指向头节点
      workInProgressHook = currentlyRenderingFiber.memorizedState;

      currentHook = alternate.memorizedState;
    }

    hook = workInProgressHook; // 将当前 workInProgressHook 指针指向的 hook state 节点返回
  } else {
    // 初次渲染阶段，需要创建一条新的 hook state 链表
    hook = {
      memorizedState: null, // hook 的状态值
      next: null, // 指向下一个 hook 的状态值
    };

    currentHook = null; // 函数组件初次渲染，将其置为 null

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
  currentlyRenderingFiber.updateQueue = []; // 用于存放即将执行的，useEffect 和 useLayoutEffect 接收的副作用函数对象
  workInProgressHook = null; // hook 链表的尾指针，初始状态为 null
}

/**
 *
 * @param {*} create 副作用回掉函数
 * @param {*} deps 依赖项数组
 */
export function useEffect(create, deps) {
  return updateEffectIml(HookPassive, create, deps);
}

/**
 *
 * @param {*} create 副作用回掉函数
 * @param {*} deps 依赖项数组
 */
export function useLayoutEffect(create, deps) {
  return updateEffectIml(HookLayout, create, deps);
}

/**
 * useEffect 与 useLayoutEffect 本质上做的事情是一样的，只是执行的时机不一样
 *
 * useEffect 是在组件渲染到页面之后，再执行接收的副作用函数
 *
 * useLayoutEffect 是在所有 dom 变更之后，浏览器绘制之前，同步执行接收副作用函数
 *
 * @param {*} hookFlags hook 函数的类型
 * @param {*} create 副作用回掉函数
 * @param {*} deps 依赖项数组
 */
function updateEffectIml(hookFlags, create, deps) {
  const hook = updateWorkInProgressHook(); // 拿到当前的 hook 对象

  if (currentHook) {
    // 更新阶段
    const prevEffect = currentHook.memorizedState;
    if (deps) {
      const prevDeps = prevEffect.deps;

      if (areHookInputsEqual(deps, prevDeps)) {
        return false;
      }
    }
  }

  const effect = { hookFlags, create, deps };
  hook.memorizedState = effect; // 更新 hook 节点
  currentlyRenderingFiber.updateQueue.push(effect); // 将副作用对象添加到 updateQueue 中，等待执行
}
