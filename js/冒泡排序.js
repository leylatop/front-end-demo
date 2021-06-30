// 替换i和j的值
function swap(A, i, j) {
    const t = A[i];
    A[i] = A[j];
    A[j] = t;
}

function bubble_sort(A) {
    for(let i = A.length; i >= 1; i--) {
        for(let j = 1; j < i; j++) {
            A[j-1] > A[j] && swap(A, j - 1, j)
        }
    }
}

var arr = [3,1,5,2,4,0];
bubble_sort(arr);
console.log(arr)