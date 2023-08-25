if (typeof Promise !== 'function') {
	throw new TypeError('A global Promise is required');
}

if (typeof Promise.try !== 'function') {
	Promise.try = {
		try(func) {
      console.log('func', func)
			if (typeof this !== 'function') {
				throw new TypeError('Receiver must be a constructor');
			}
			return new this(function (resolve) {
				resolve(func());
			});
		}
	}.try;
}
const f1 = () =>  console.log('f1 now');
const f2 = () => setTimeout(() => console.log('f2 later'), 1000);

Promise.try(f1)
console.log('f1 next')

Promise.try(f2)
console.log('f2 next')

// Promise.try 方法，让同步的方法按同步去执行，异步的方法按异步去执行
// 使用 Promise.try 时，并不知道传入的参数是同步函数还是异步函数，但是它会自动判断，然后按照正确的方式去执行。

