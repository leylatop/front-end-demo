let currentValue = 0
let a = {
  valueOf: () => {
    currentValue+=1
    return currentValue
  }
}

console.log(a == 1 && a == 2 && a == 3)

