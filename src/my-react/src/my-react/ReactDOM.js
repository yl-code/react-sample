import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop';

// 将 vDOM => DOM
function render(element, container) {
  // console.log(element, container);

  // 构建 fiber 根节点，fiber 是一个链表结构的对象
  const FiberRoot = {
    type: container.nodeName.toLowerCase(),
    props: { children: element },
    stateNode: container, // stateNode 指向该 fiber 节点的真实 dom
  };

  // 调度更新 fiber 节点
  scheduleUpdateOnFiber(FiberRoot);
}

export const ReactDOM = { render };
