const Promise = require('./promise')
const promise = new Promise((resolve, reject) => {
  // 正确调用
  // resolve('ok')

  // 错误调用
  // reject('err')
  // throw new Error('出错了')
  // reject(new Error('出错了'))

  // 异步调用
  setTimeout(() => {
    resolve('2s ok')
  }, 2000)
})

promise.then((value) => {
  console.log('success', value);
}, (reason) => {
  console.log('err', reason);
})

promise.then((value) => {
  console.log('success', value);
}, (reason) => {
  console.log('err', reason);
})

// 针对then的return值做不同处理
// 1. onFulFilled/onRejected 返回的不是promise，return的是普通值，那么这个值会被传递到下一个then的成功回调（onFulFilled）中
// 2. onFulFilled/onRejected 返回的是promise，则根据（onFulFilled或onRejected）返回的promise 执行的resolve/reject来决定走成功还是失败，执行resolve则走下一个then的成功，执行reject则走下一个then的失败，无论执行的是本次then的onFulFilled还是onRejected
// 3. 若想要走到下一个then的onRejected中，可以在本次then的成功回调（onFulFilled）或失败回调（onRejected）中抛出异常
// 总结：要么抛错，要么返回一个失败的promise，其他都走成功
// ps: 如果返回的是一个pending的promise，则会中断promise链
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('成功啦')
    reject('失败啦')
  }, 2000)
})
p.then((value) => {
  // return value
  // throw new Error('resolve-出错')
  // 上一个then执行完resolve会走到这里
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 这里执行resolve会走到下一个then的onResolved
      // resolve('1s后，success-成功啦')

      // 这里执行reject会走到下一个then的onRejected
      reject('1s后，error-成功啦')
    }, 1000)
  })
}, (reason) => {
  // return reason
  // throw new Error('reject-出错')
  // 上一个then执行完reject会走到这里
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 这里执行resolve会走到下一个then的onResolved
      resolve('1s后，success-失败啦')

      // 这里执行reject会走到下一个then的onRejected
      // reject('1s后，error-失败啦')
    }, 1000)
  })

}).then((data) => {
  console.log('success-这里', data)

}, (err) => {
  console.log('error-这里', err)
})

