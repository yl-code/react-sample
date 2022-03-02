import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from '..';

export function RouteGuardFunc(props) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const [nextLocation, setNextLocation] = useState(null);
  const [unBlock, setUnBlock] = useState(null);

  /**
   * 下面 useEffect 依赖项为空时，log 每次打印的 props.when 不是最新的
   * 是因为：
   * 此时的 useEffect 接收的第一个参数位的函数，只会在组件渲染完成之后执行一次，后续就不会重新执行了
   * 组件更新时，会接收一个新的 props
   * 而 log 所在的函数，没有重新执行，所以 log 打印所使用的 props，还是是上一个 props
   */
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(props.when);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    console.log('mount');

    // 优化
    // 当 props.when 为 false 时，表示不需要 block，就啥也不干
    if (!props.when) return;

    console.log('exec history.block');

    const cancel = history.block((nextLocation, action) => {
      console.log('route will change', props.when);

      if (props.when) {
        if (props.when) setVisible(true);

        setNextLocation(nextLocation);
        setAction(action);

        return false;
      } else {
        return true;
      }
    });

    // 下面写法为什么不行 ???
    // setUnBlock(cancel);
    //
    // 因为「setState」接收的如果是一个函数的话，其返回值才是作为 newState
    // 而 cancel 本身就是函数，所以直接 setUnBlock(cancel) 就会导致更新的值不准
    //
    //
    // 40 行与 44 行效果一样
    // setUnBlock(() => {
    //   return () => cancel();
    // });

    setUnBlock(() => cancel);

    return cancel;
  }, [props.when]);

  const onOk = () => {
    unBlock && unBlock();

    switch (action) {
      case 'PUSH':
        history.push(nextLocation);
        break;
      case 'POP':
        history.goBack();
        break;
      case 'REPLACE':
        history.replace(nextLocation);
        break;
      default:
        break;
    }

    setVisible(false);
  };

  const onCancel = () => setVisible(false);

  return (
    <Modal
      destroyOnClose
      title='Func Warning'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      children={
        <div>
          Are you sure you want to go to
          <span>「{nextLocation && nextLocation.pathname}」</span>
        </div>
      }
    />
  );
}
