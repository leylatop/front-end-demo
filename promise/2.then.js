const Promise = require('./promise')
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 执行下一个then的onFulFilled
  }, 1000)
  // reject(new Error('错了')) // 执行下一个then的onRejected
})

// then执行完之后，会返回一个新的promise
const promise2 = promise1.then((value) => {
  console.log(value);
  throw new Error('promise1的onFulFilled出错了')
  // return value
}, (err) => {
  console.log(err);
  return err
})

promise2.then((value) => {
  console.log('promise2的onFulFilled', value);
}, (error) => {
  console.log('promise2的onRejected', error);
})

const promise3 = promise1.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000)
    }, 1000)
  })
})

promise3.then((value) => {
  console.log(value);
}, () => {
  
})

const promise4 = promise1.then((data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Promise((resolve) => {
        setTimeout(() => {
          resolve('1000')
        }, 1000)
      }))
    }, 1000)
  })
})
promise4.then((value) => {
  console.log('promise4---', value);
}, (err) => {
  console.log('promise4--err--', err);
  
})