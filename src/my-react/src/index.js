import './index.css';
import { Component, ReactDOM } from './my-react';

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
    <a href='/'>link</a>

    <FuncComponent name='function component' />
    <ClassComponent name='class component' />

    <>
      <h1>fragment tag h1</h1>
      <h2>fragment tag h2</h2>
    </>
  </div>
);

ReactDOM.render(jsx, document.querySelector('#root'));
