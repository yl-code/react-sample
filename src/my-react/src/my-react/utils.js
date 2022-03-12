// ! fiber flags
export const NoFlags = /*                      */ 0b00000000000000000000;
export const Placement = /*                    */ 0b0000000000000000000010; // 2
export const Update = /*                       */ 0b0000000000000000000100; // 4
export const Deletion = /*                     */ 0b0000000000000000001000; // 8

// ! hook flags
export const HookLayout = /*                    */ 0b010; // 2
export const HookPassive = /*                   */ 0b100; // 4

/**
 * 比较依赖项的值是否有变化
 *
 * @param {*} nextDeps 下一个依赖项数组
 * @param {*} prevDeps 前一个依赖项数组
 *
 */
export function areHookInputsEqual(nextDeps, prevDeps) {
  if (!prevDeps) return false;

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}

export function isSymbol(val) {
  return typeof val === 'symbol';
}

export function isFn(fn) {
  return typeof fn === 'function';
}

export function isStr(s) {
  return typeof s === 'string';
}

export function isStringOrNumber(s) {
  return typeof s === 'string' || typeof s === 'number';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

// 简陋版 updateNode
// export function updateNode(node, nextVal) {
//   Object.keys(nextVal).forEach((k) => {
//     if (k === 'children') {
//       if (isStringOrNumber(nextVal[k])) {
//         node.textContent = nextVal[k];
//       }
//     } else {
//       node[k] = nextVal[k];
//     }
//   });
// }

// 进阶版 updateNode
export function updateNode(node, prevVal, nextVal) {
  // 先按照 prevVal 执行一些更新的前置工作
  Object.keys(prevVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(prevVal[k])) {
        node.textContent = ''; // 清空文本或字符串类型的 children
      }
    } else if (k.startsWith('on')) {
      const eventName = k.slice(2).toLocaleLowerCase();
      node.removeEventListener(eventName, prevVal[k]); // 事件注销
    } else if (!(k in nextVal)) {
      node[k] = ''; // 去掉被删除的属性
    }
  });

  Object.keys(nextVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(nextVal[k])) {
        node.textContent = nextVal[k] + '';
      }
    } else if (k.startsWith('on')) {
      const eventName = k.slice(2).toLocaleLowerCase();
      node.addEventListener(eventName, nextVal[k]);
    } else {
      node[k] = nextVal[k];
    }
  });
}
