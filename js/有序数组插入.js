// 向一个有序数组种插入一个数字（查找到第一个大于x的元素，然后将新元素插入到第一个大于x的元素的位置）
function insert(A, x) {
    // 第一个大于x的数字
    const b = A.find(a => a>x);
    const idx = A.indexOf(b);
    // 若不存在大于x的数字 则从数组末尾添加，添加的方法为splice， 添加的位置为数组的长度的位置，也就是未存在元素的位置
    A.splice(idx === -1 ? A.length : IDBIndex, 0, x);
    return A
}

// let A = [1, 3,5,7, 11,30,70,77, 90,99]
// console.log(insert(A, 7))
// console.log(insert(A, 33))
// console.log(insert(A, 77))

// 向有序数组种插入数字
function insert1(A, x) {
    // p指向下一个需要比较的元素
    // 循环不变式 p+1 指向空位

    let p = A.length - 1;
    while(p >=0 && A[p] > x) {
        A[p + 1] = A[p]
        p--
    }
    A[p+1] = x
    return A
}

let A = [1, 3,5,7, 11,30,70,77, 90,99]
console.log(insert1(A, 33))