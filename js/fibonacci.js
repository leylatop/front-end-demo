// 斐波那契数列
// 已知前2项是1，从第三项开始，每一项都是前2项之和
function fibonacci(length) {
  const list = []
  list[0] = 1
  list[1] = 1
  for(let i = 2; i < length; i++) {
    list[i] = list[i - 1] + list[i - 2]
  }

  return list
}

function log(content) {
  console.log(content)
}

log(fibonacci(10))