class Animate {
  constructor(dom) {
    this.dom = dom                   // 进行运动的dom节点
    this.startTime = 0               // 动画开始时间
    this.startPos = 0                // 动画开始时，dom节点的位置，即dom的初始位置
    this.endPos = 0                  // 动画结束时，dom节点的位置，即dom的目标位置
    this.propertyName = null         // dom节点需要被改变的css属性名
    this.easing = null               // 缓动算法
    this.duration = null             // 动画持续时间
    this.timeId = null               // 定时器
  }

  /**
   * 启动
   * @param {*} propertyName 要改变css的属性名，left、top
   * @param {*} endPos 目标位置
   * @param {*} duration 动画持续时间
   * @param {*} easing 缓动算法
   */
  start = (propertyName, endPos, duration, easing) => {
    this.startTime = +new Date        // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]  // dom节点初始位置
    this.propertyName = propertyName  // dom节点需要被改变的CSS属性名
    this.endPos = endPos  // dom节点目标位置
    this.duration = duration   // 动画持续事件
    this.easing = tween[easing]  // 缓动算法

    // 开启定时器
    const timeId = setInterval(() => {      // 启动定时器，开始执行动画
      // 每19ms执行一次step
      if (this.step() === false) {         // 如果动画已结束，则清除定时器
        clearInterval(timeId)
      }
    }, 19)
  }

  step = () => {
    const t = +new Date        // 取得当前时间
    if (t >= this.startTime + this.duration) {       // (1)
      this.update(this.endPos)   // 更新的CSS属性值
      return false
    }
    const pos = this.easing(t - this.startTime, this.startPos,
      this.endPos - this.startPos, this.duration)
    // pos为当前位置
    this.update(pos)    // 更新的CSS属性值
  }

  update = (pos) => {
    this.dom.style[this.propertyName] = pos + 'px'
  }

}

/**
 * 缓动算法
 * t：动画已消耗时间
 * b：当前位置
 * c：目标位置
 * d：动画总时长
 */

 const tween = {
  linear: (t, b, c, d) => {
    return c * t / d + b
  },
  easeIn: (t, b, c, d) => {
    return c * (t /= d) * t + b
  },
  strongEaseIn: (t, b, c, d) => {
    return c * (t /= d) * t * t * t * t + b
  },

  strongEaseOut: (t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: (t, b, c, d) => {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: (t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}