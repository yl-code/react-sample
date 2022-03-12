import './index.css';
import {
  ReactDOM,
  Component,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
} from './my-react';

function FuncComponent({ name }) {
  const [num, setNum] = useReducer((x) => x + 1, 1);

  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(10);

  useEffect(() => {
    console.log('my useEffect exec with num: ', num);
  }, [num]);

  useLayoutEffect(() => {
    console.log('my useLayoutEffect exec with count2: ', count2);
  }, [count2]);

  console.log('FuncComponent render');
  return (
    <div className='border'>
      <p>{name}</p>

      <div className='border'>
        <p>
          <span>useReducer num: </span>
          <span>{num}</span>
        </p>
        <button onClick={setNum}>add num</button>
      </div>

      <div className='border'>
        <p>
          <span>useState count: </span>
          <span>{count}</span>
        </p>
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          add count
        </button>
      </div>

      <div className='border'>
        <p>
          <span>useState count2: </span>
          <span>{count2}</span>
        </p>
        <button
          onClick={() => {
            setCount2((count2) => count2 * 2);
          }}
        >
          add count2
        </button>
      </div>
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
    {/* <ClassComponent name='class component' /> */}

    {/* <>
      <h1>fragment tag h1</h1>
      <h2>fragment tag h2</h2>
    </> */}
  </div>
);

ReactDOM.render(jsx, document.querySelector('#root'));
