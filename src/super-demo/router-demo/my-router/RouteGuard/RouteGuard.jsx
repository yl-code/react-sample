import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from '..';

export function RouteGuard({ when = false }) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const [nextLocation, setNextLocation] = useState(null);
  const [unBlock, setUnBlock] = useState(null);

  useEffect(() => {
    console.log('RouteGuard mount', when);

    if (!when || unBlock) return;

    const cancel = history.block((nextLocation, action) => {
      console.log('route will change', when);

      if (when) setVisible(true);

      setNextLocation(nextLocation);
      setAction(action);

      return false;
    });

    // setUnBlock (cancel) 这样写为什么不行 ???
    setUnBlock(() => cancel);

    return cancel;
  }, [when]);

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
      title='Warning'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      children={
        <div>
          Are you sure you want to go to 「
          {nextLocation && nextLocation.pathname}」
        </div>
      }
    />
  );
}
