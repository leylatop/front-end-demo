/**
 * 利用策略模式、发布订阅模式实现表单验证
 */

const strategies = {
  isNoEmpty: (value, errorMsg) => {
    if (value === '') return errorMsg
  },

  minLength: (value, length, errorMsg) => {
    if (value.length < length) return errorMsg
  },

  isMobile: (value, errorMsg) => {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg
  }
}

class Validator {
  constructor() {
    this.queue = [] // 保存校验规则
  }

  add = (value, rule, errorMsg) => {
    const ary = rule.split(':') //把strategy和参数分开
    this.queue.push(() => {
      const strategy = ary.shift() // 将数组第一个元素拿出来，
      ary.unshift(value) //将value补到数组第一个位置
      any.push(errorMsg) // 将errorMsg 补到最后
      return strategies[ strategy ].apply( value, ary ) // 返回执行结果
    })
  }
  start = () => {
    this.queue.forEach((strategy) => {
      const msg = strategy()
      if(msg) return msg
    })
  }
}

const validateFunc = () => {
  const validator = new Validator()    // 创建一个validator对象

  /***************添加一些校验规则****************/
  validator.add('qiaoxx', 'isNonEmpty', '用户名不能为空')
  validator.add('666888999', 'minLength:6', '密码长度不能少于6位')
  validator.add('18888888888', 'isMobile', '手机号码格式不正确')
  const errorMsg = validator.start()    // 获得校验结果
  return errorMsg  // 返回校验结果
}

const registerForm = document.getElementById('registerForm')
registerForm.onsubmit = () => {
  const errorMsg = validateFunc()   // 如果errorMsg有确切的返回值，说明未通过校验
  if (errorMsg) {
    alert(errorMsg)
    return false    // 阻止表单提交
  }
}

