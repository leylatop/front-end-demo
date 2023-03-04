// 使用递归分支的思想，
// 通过一趟排序，将待排记录分隔成独立的两部分，
// 其中一部分记录的关键字均比另一部分的关键字小，则可以分别对这两部分记录继续进行排序，以达到整个序列有序
var a = [ 25, 76, 34, 232, 6, 456, 221];
function quickSort(array) {
  var quick = function(arr) {
    if (arr.length <= 1) return arr
    // 将待排记录分隔成独立的两部分
    const index = Math.floor(arr.length >> 1)
    const pivot = arr.splice(index, 1)[0]
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > pivot) {
        right.push(arr[i])
      } else if (arr[i] <= pivot) {
        left.push(arr[i])
      }
    }
    // 分别对这两部分记录继续进行排序，递归组合
    return quick(left).concat([pivot], quick(right))
  }
  const result = quick(array)
  return result

}
console.log(quickSort(a)) //  [ 6, 25, 34, 76, 221, 232, 456]