function compose(...funcs) {
  if(funcs.length === 0) return args => args
  if(funcs.length === 1) return funcs[0]
  console.log(funcs)
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 第一次 a=> add3 b=> add2 返回 (...args) => add3(add2(...args))
// 第二次 a = (...args) => add3(add2(...args)) b=> add1 返回 (...args) => add3(add2((add1(...args)))


// function add1(str) {
//   return 'a' + str
// }

// function add2(str) {
//   return 'b' + str
// }
// function add3(str) {
//   return 'c' + str
// }

// const fn = compose(add3, add2, add1)
// const result = fn('hello')
// console.log(result)

let logger1 = (store) => next => action => {
  console.log('logger1')
  next(action)
}

let logger2 = (store) => next => action => {
  console.log('logger2')
  console.log(next)
  next(action)
}

let logger3 = (store) => next => action => {
  console.log('logger3')
  next(action)
}

let store = { dispatch () { console.log('原生dispatch') }}
logger1 = logger1(store)
logger2 = logger2(store)
logger3 = logger3(store)

// (...args) => logger1(logger2(logger3(...args)))

let composed = compose(logger1, logger2, logger3)
let newDispatch = composed(store.dispatch)
newDispatch({ type: 'ADD' })



