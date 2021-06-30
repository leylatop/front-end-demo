// 插入排序
function insert2(A, i, x) {
    let p = i - 1;
    while(p >= 0 && A[p] > x) {
        A[p+1] = A[p]
        p--
    }
    A[p+1] = x
}


function insertion_sort(A) {
    for(let i = 0; i < A.length; i++) {
        insert2(A, i, A[i]);
    }
}
console.log(insertion_sort([1, 4, 5, 2, 0,3]))


