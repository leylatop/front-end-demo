const resolved = Promise.resolve(40);
const rejected = Promise.reject(-1);
const rejected2 = Promise.reject(-2);

// 当有一个promise变成fulfilled状态时，包装实例就会变成fulfilled状态；
Promise.any([resolved, rejected]).then((result) => {
  console.log("==", result);
});
// 当所有promise都变成rejected状态时，包装实例就会变成rejected状态，且抛出错误。
Promise.any([rejected, rejected2]).then((result) => {
  console.log("--", result);
});


// Promise.any 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
// 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态，且抛出错误。