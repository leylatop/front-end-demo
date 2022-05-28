var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    if(callback.call(ary[i], ary[i], i, ary) === false) {
      break // callback 的执行结果返回false，提前终止迭代
    }
  }
};
each([3, 4, 3], function (n, i, ary) {
  if(n > 3) { // n > 3的时候终止循环
    return false
  }
  console.log(n, i, ary)

});


[3, 4, 3].forEach(function(n, i, ary) {
  console.log(n, i, ary)
});