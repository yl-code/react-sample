let expirationTime = 0;

/**
 * 时间切片，过期时间豪数
 * 源码中，根据任务优先级 priorityLevel 不同，而设置的时间切片长度也不同
 * 这里简化处理，统一定位 5ms
 */
const timeout = 5;

const timerQueue = []; // 存放没有过期的任务，可以等待执行
const taskQueue = []; // 存放已过期的任务，需要立即执行

/**
 * 接收任务回掉函数，创建任务对象，然后进行任务调度
 *
 * @param {*} callback 任务回掉函数
 */
export function scheduleCallback(callback) {
  // 这里没有处理任务的优先级情况，简化处理了任务对象，并直接 push 到了 taskQueue 中
  const newTask = { callback };
  taskQueue.push(newTask);

  // 进行任务调度
  schedule(taskQueue);
}

export function schedule() {}

/**
 * 执行任务
 */
function flushWork() {
  expirationTime = getCurrentTime() + timeout;

  let currentTask = taskQueue[0];
  while (currentTask && !shouldYield()) {
    const { callback } = currentTask;
    callback();

    taskQueue.shift();
    currentTask = taskQueue[0];
  }
}

/**
 * 若 当前时间 大于等于 过期时间，则返回 true，表示任务过期
 */
function shouldYield() {
  return getCurrentTime() >= expirationTime;
}

function getCurrentTime() {
  return performance.now();
}
