const resolved = Promise.resolve(40)
const rejected = Promise.reject(-1)
const allSettledPromise = Promise.allSettled([resolved, rejected])
allSettledPromise.then((result) => {
  console.log(result)
})

// Promise.allSettled 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
// 无论成功还是失败，都会执行 allSettledPromise.then的回调函数，且将结果作为参数传递给回调函数
// 该方法由 ES2020 引入。
// 结果的格式如下，且总是如此：
// [
//    异步操作成功时
//   {status: "fulfilled", value: 42},
//    异步操作失败时
//   {status: "rejected", reason: -1}
// ]