const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
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
  then(onFulFilled, onRejected) {
    if(this.status === FULFILLED) {
      onFulFilled(this.value)
    }

    if(this.status === REJECTED) {
      onRejected(this.reason)
    }

    // 调用then时，若executor 是异步，则依然是pending状态，此时先把onResovled和onRejected存起来
    if(this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulFilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise