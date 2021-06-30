// 二分查找法
function bsearch(A, x) {
    let l=0,
        r=A.length-1,
        guess;
    while(l <= r) {
        // 循环不变式
        // guess 等于l r中间位置
        guess = Math.floor((l+r)/2);
        if (A[guess] === x) return guess
        else if(A[guess] > x) r=guess-1
        else l=guess+1
    }
    return -1
}
// const A = [1, 3,5,7, 11,30,70,77, 90,99]
// console.log(bsearch(A, 7))
// console.log(bsearch(A, 33))
// console.log(bsearch(A, 77))