import { renderWithHooks } from './hooks';
import { reconcileChildren } from './ReactChildFiber';
import { updateNode } from './utils';

/**
 * 更新原生组件，也就是原生 HTML 标签
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateHostComponent(wip) {
  // 如果没有 stateNode，也就是没有当前 fiber 的原生节点，就表示当前是初次渲染
  // 需要给它创建一个 stateNode
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);

    updateNode(wip.stateNode, {}, wip.props); // 更新节点的属性，包括 children
  }

  reconcileChildren(wip, wip.props.children);

  // console.log('--- wip ---', wip);
}

/**
 * 渲染 Fragment 组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

/**
 * 更新函数组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateFunctionComponent(wip) {
  renderWithHooks(wip);

  const children = wip.type(wip.props);
  reconcileChildren(wip, children);
}

/**
 * 更新类组件
 *
 * @param {*} wip 接收一个 fiber 节点
 */
export function updateClassComponent(wip) {
  const { props, type } = wip;
  const instance = new type(props);
  const children = instance.render();

  reconcileChildren(wip, children);
}
