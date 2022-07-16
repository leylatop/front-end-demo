import { Stack } from './Stack'
// 将10进制数字，转化成2-36任意进制的数字
function baseConverter(decNumber, base) { 
  const remStack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString

  if(!(base >= 2 && base <=36)) return ''

  while(number > 0) {
    rem = Math.floor(number % base) // 求余数
    remStack.push(rem)
    number = Math.floor(number / base) // 求除数，然后继续循环
  }

  while(!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}


console.log(baseConverter(100345, 2))
console.log(baseConverter(100345, 8))
console.log(baseConverter(100345, 16))
console.log(baseConverter(100345, 35))
