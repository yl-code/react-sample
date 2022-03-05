// import ReactDOM from 'react-dom';

import ReactDOM from './my-react/react-dom';
import { Component } from './my-react/component';

import './index.css';

function FuncComponent({ name }) {
  return (
    <div className='border'>
      <p>{name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className='border'>
        <p>{name}</p>
      </div>
    );
  }
}

const jsx = (
  <div className='border'>
    <h1>my-react</h1>
    <a href='#'>link</a>

    <FuncComponent name='function' />
    <ClassComponent name='class' />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));

// console.log('React', React.version);
