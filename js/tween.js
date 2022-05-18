/**
 * 缓动算法
 * t：动画已消耗时间
 * b：当前位置
 * c：目标位置
 * d：动画总时长
 */

var tween = {
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