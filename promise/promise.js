const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

/**
 * 解析promise2和x之间的关系，来判断执行promise2的resolve还是reject（最终结果：执行resolve/reject)
 * @param {*} promise2 执行完then之后return的新promise
 * @param {*} x then的onFulFilled/onRejected 执行后的return值
 * @param {*} resolve 新promise的resolve
 * @param {*} reject 新promise的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
  }

  // 是一个对象或者function，满足这两个条件才可能是个promise
  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    let called = false // 保证不被多次调用
    try {
      // Object.defineProperty(x, 'then', {
      //   get() { throw new Error('error')}
      // })
      // 如果x是个对象，获取then的时候，也有可能会报错
      // 因为then可能是由 defineProperty 定义出来的属性
      let then = x.then
      // 能正确调用then方法，我们就认为它是个promise
      if(typeof then === 'function') {
        // 使用call调用then 1. 避免重复获取then值可能会报错 defineProperty  2. 将then中的this指向x
        // 同x.then(() => {}, () => {})
        then.call(x, y => {
          // 对y值再递归一下 resolvePromise（若y是普通值，就直接调用resolve； 若y是promise，则再递归一下 resolvePromise）
          // ************
          // **若解析出的结果是promise，则一直解析， 直到最终解析出普通值，
          // **将值作为参数放到promise2的resolve参数，调用resolve
          // ************
          if(called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  // 执行器函数
  constructor(executor) {
    this.status = PENDING // 默认等待状态
    this.value = undefined
    this.reason = undefined

    // 成功和失败的回调列表
    // 实例的then可以被多次调用
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      // 若value值是promise
      // 则将自己的resolve和reject作为value的onFulFilled和inRejected
      // 且return
      if(value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn()) // 真正执行 resolve时，发布
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn()) // 真正执行reject时，发布
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // 实例的then可以被多次调用
  // then可以链式调用（需要在then方法中return 一个新的promise实例）
  then(onFulFilled, onRejected) {
    // 对 onFulFilled 和 onRejected为 undifined时候进行处理，实现then的穿透特性
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
  
    // 将第一个promise的then的 onFulFilled 和 onRejected放到promise2的执行器中，立即执行
    // 拿到 第一个promise的then的 onFulFilled 和 onRejected 的返回值 x，传到第二个then的 resolve中
    const promise2 = new Promise((resolve, reject) => {
      // 执行器执行时，promise2 还未被成功定义
      if (this.status === FULFILLED) {
        // 为了保证 调用 resolvePromise时，promise2已结被成功定义，
        // 所以这里要用setTimeout让 onFulFilled/ onRejected异步执行
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      // 调用then时，若executor 是异步，则依然是pending状态，此时先把onResovled和onRejected存起来
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })

    return promise2
  }

  // 支持错误捕获，本质是个then方法
  catch (onRejected) {
    return this.then(null, onRejected)
  }
}

// 产生延迟对象的方法
Promise.deferred = function() {
  let dfd = {}
  // promisea+中提供了测试方法，会调用 Promise.deferred 获取到promise 实例、resolve、reject
  // 测试方法
  // 1. 全局安装 npm install promises-aplus-tests -g
  // 2. promises-aplus-tests + 文件名
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    // 执行resolve，对value的值进行判断
    resolve(value)
  })
}

Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    // 直接执行，走到下一个then的onRejected，无需判断数据类型
    // 如果执行了 Promise.reject，value且是promise，则 executor 内部如果执行了reject会报错
    reject(value)
  })
}


module.exports = Promise