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
  resolve(x)
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
}

module.exports = Promise