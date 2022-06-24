const Promise = require('./2.promise-then')

const p = new Promise((resolve, reject) => {
  reject('ok')
})

// 本质上是对onFulFilled和onRejected为 undefined 的处理
// onRejected 默认处理为throw error,会直接走到下一个有onRejected方法的then中去
p.then(123).then(123, (err) => {
  console.log('第二个then的onRejected', err);
  return 234
}).then(data => {
  console.log(data);
}, err => {
  console.log('fail--',err);
})
