import { Deque } from './Deque'
// 回文检测器—正反都能读的通的单词、词组、数或一系列字符的序列
function palindromeChecker(aString: string) {
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false
  }

  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }
  // 核心：将双端队列的两端队头拿出进行比较，如果两端相等的话，则符合回文规则
  while(deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if(firstChar !== lastChar) {
      isEqual =  false
    }
  }

  return isEqual
}

console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('kayak', palindromeChecker('kayak'))
console.log('level', palindromeChecker('level'))
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'))
console.log('Step on no pets', palindromeChecker('Step on no pets'))
