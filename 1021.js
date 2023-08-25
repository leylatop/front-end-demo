const s = "(()(()))()"


var removeOuterParentheses = function(s) {
  let stack = []
  let nStack = []
  for(let i = 0; i < s.length; i ++) {
      const k = s[i]
      if(k === '(') {
          stack.push(k)
      } else if(k === ')') {
          const index = stack.lastIndexOf('(')
          if(index === 1) {
            nStack = nStack.concat(stack.splice(index))
            nStack.push(k)
          } else if(index === 0) {
            stack = []
          } else {
            stack.push(k)
          }
      } else {
        stack.push(k)
      }

  }

  if(stack.length >=2) {
    nStack = nStack.concat(stack.splice(1, stack.length - 2))
  }

  console.log(nStack.join(''))
  return nStack.join('')
};

removeOuterParentheses(s)