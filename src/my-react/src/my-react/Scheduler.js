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
  schedule(flushWork);
}

function schedule(callback) {
  timerQueue.push(callback);
  postMessage();
}

// MessageChannel 代表的是宏任务，在这里执行 timerQueue 中的任务
const postMessage = () => {
  const { port1, port2 } = new MessageChannel();

  port1.onmessage = () => {
    // 将 timerQueue 中的任务取出来
    const taskTemp = timerQueue.splice(0, timerQueue.length);

    taskTemp.forEach((task) => task());
  };
  port2.postMessage(null);
};

/**
 * 执行任务
 */
function flushWork() {
  expirationTime = getCurrentTime() + timeout;

  let currentTask = taskQueue[0];
  // 如果还有任务，并且时间切片的时间还没用完，就可以执行任务
  while (currentTask && !shouldYield()) {
    const { callback } = currentTask;
    callback();

    taskQueue.shift();
    currentTask = taskQueue[0];
  }
}

/**
 * 若 当前时间 大于等于 过期时间，则返回 true，表示时间切片的时间已用完
 */
export function shouldYield() {
  return getCurrentTime() >= expirationTime;
}

function getCurrentTime() {
  return performance.now();
}
