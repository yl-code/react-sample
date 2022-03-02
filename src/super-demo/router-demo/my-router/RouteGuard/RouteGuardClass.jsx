import { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from '..';

@withRouter
export class RouteGuardClass extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, nextLocation: null, action: '' };
  }

  componentDidMount() {
    const { history } = this.props;

    this.unBlock = history.block((nextLocation, action) => {
      console.log('route will change', nextLocation, action);

      const { when } = this.props;
      if (when) {
        this.setState({ visible: true, nextLocation, action });
        return false;
      } else {
        return true;
      }
    });
  }

  onOk = () => {
    const { history } = this.props;
    const { nextLocation, action } = this.state;

    this.unBlock && this.unBlock();

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

    this.setState({ visible: false });
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, nextLocation } = this.state;

    return (
      <Modal
        destroyOnClose
        title='Class Warning'
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        children={
          <div>
            Are you sure you want to go to
            <span>「 {nextLocation && nextLocation.pathname} 」</span>
          </div>
        }
      />
    );
  }
}
