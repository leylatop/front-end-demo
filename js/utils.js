Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

// 移除数组中某个元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.reduce = function(callback, pre) {
    for(let i=0; i<this.length; i++) {
        if(!pre) {
            pre = callback(this[i], this[i+1], i+1, this)
            i++
        } else {
            pre = callback(pre, this[i], i, this)
        }
    }
    return pre;
}


function add(a, b, c) {
    return a + b + c
  }

  const add2 = curry(add)
  console.log(add2(1)(2)(3)) // 6
  function sum() {
    return [].reduce.call(arguments, (cur, acc) => cur + acc)
  }
  const sum2 = curry(sum)
  console.log(sum2(1, 2)(3, 4) == 10) // true
  console.log(sum2(1)(2)(3)(4)(5) == 15) // true
function curry(fn) {
    let arr = []
    let collectArg
    if (fn.length) {
        collectArg = (...args) => {
            arr.push(...args)
            if (arr.length < fn.length) {
                return collectArg
            } else {
                return fn(...arr)
            }    
        }  
    } else {
        collectArg = (...args) => {
            arr.push(...args)
            return collectArg
        }
        collectArg.toString = () => {
            let num = fn(...arr)
            arr.length = 0
            return num 
        }  
    }  
    return collectArg
}