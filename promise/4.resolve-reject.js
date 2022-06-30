const Promise = require('./promise')

Promise.resolve('123').then((data) => {
  console.log(data)
})


Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('456')
  }, 1000)
})).then((data) => {
  console.log(data)
})

Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('456')
  }, 1000)
})).then((data) => {
  console.log(data)
}, err => {
  console.log('reject --', err)
})

Promise.reject('123').then((data) => {
  console.log(data)
}, (err) => {
  console.log('Promise.reject--', err)
})

Promise.reject(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('456')
  }, 1000)
})).then((data) => {
  console.log(data)
}, err => {
  console.log('Promise.reject--', err)
})
