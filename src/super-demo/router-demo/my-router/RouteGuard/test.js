// 对比下面几种写法

/**
 * log 使用的 b 的引用一直是旧的，所以 log 打印的值没有变化
 */
// let b = { a: 1 };

// const fn = (b) => {
//   return setInterval(() => {
//     console.log(b.a);
//   }, 1000);
// };

// fn(b);

// setInterval(() => {
//   b = { a: 2 };
//   console.log('change b');
// }, 2000);

/********************************************************
 * b 一直是同一个引用，所以 log 打印的值会变化
 *
 */
// let b = { a: 1 };

// const fn = (b) => {
//   return setInterval(() => {
//     console.log(b.a);
//   }, 1000);
// };

// fn(b);

// setInterval(() => {
//   b.a++;
//   console.log('change b');
// }, 2000);

/*******************************************
 * 解构产生的局部变量
 */
// const fn = ({ a }) => {
//   return setInterval(() => {
//     console.log(a);
//   }, 1000);
// };

// let b = { a: 1 };

// fn(b);

// setInterval(() => {
//   b.a++;
//   console.log('change b');
// }, 2000);

/*******************************************
 * 局部变量的问题
 * 全局的 a 改变了，不会影响 fn 的局部变量
 */
const fn = (a) => {
  return setInterval(() => {
    console.log(a);
  }, 1000);
};

let a = 1;

fn(a);

setInterval(() => {
  a++;
  console.log('change a');
}, 2000);
