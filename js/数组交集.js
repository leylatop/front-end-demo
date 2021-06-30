const firstArray = [2, 2, 4, 1]; 
const secondArray = [1, 2, 0, 2];
const thirdArray = [3, 4, 1, 2];

function intersection(arr1, ...args) {
    if (!arr1 || [...args].length === 0) {
        throw console.error('参数格式有误');
    }
    if (Object.prototype.toString.call(arr1) !== '[object Array]' || [...args].find((item) => Object.prototype.toString.call(item) !== '[object Array]')) {
        throw console.error('请输入正确的数据类型');
    }
    let arg = [arr1, ...args];
    let len = arg.length;
    let newArr = [...arr1];
    for(let i=0; i<len; i++ ) {
        newArr = arg[i].filter((item) => newArr.indexOf(item) > -1)
    }

    return newArr
}

console.log(intersection(firstArray, secondArray,thirdArray)) 