/**
 * 定义 Fiber、FiberNode 的数据结构
 */

import { Placement } from './utils';

/**
 * fiber 的结构
 *
 * type：标记节点类型
 * key：标记节点在当前层级下的唯一性
 * props：节点的属性
 * index：标记节点在当前层级下的位置
 * child：指向第一个子 fiber 节点
 * sibling：指向下一个兄弟 fiber 节点
 * return：指向父 fiber 节点
 * stateNode：如果组件是原生标签，则指向该 dom 节点，如果是类组件，则指向该类的实例
 * flags：表示当前 fiber 节点需要进行什么操作，如：删除、插入、更新
 * alternate：指向更新之前的 fiber 节点
 */
export function createFiber(vnode, returnFiber) {
  const newFiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    stateNode: null,
    child: null,
    return: returnFiber,
    sibling: null,
    flags: Placement,
    alternate: null,
  };

  return newFiber;
}
