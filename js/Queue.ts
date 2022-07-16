export class Queue {
  private items
  private count
  private lowestCount
  constructor() {
    this.items = {}
    this.count = 0 // 控制队列的大小
    this.lowestCount = 0 // 追踪队列的第一个元素
  }
  enQueue(element) {
    this.items[this.count] = element
    this.count++
  }

  deQueue() {
    if (this.isEmpty()) return undefined
    const result = this.items[this.lowestCount] // 1. 取出
    delete this.items[this.lowestCount] // 2. 删除
    this.lowestCount++ // 3. 移动前端
    return result // 返回
  }

  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }

  isEmpty() {
    return this.count - this.lowestCount === 0
  }

  size() {
    return this.count - this.lowestCount
  }

  clear() {
    this.items = {}
    this.lowestCount = 0
    this.count = 0
  }

  toString() {
    if (this.isEmpty()) return ''
    let objString = `${this.items[this.lowestCount]}`

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }

    return objString
  }
}

// const queue = new Queue()
// console.log(queue.isEmpty())
// queue.enQueue('qiao')
// queue.enQueue('tian')
// console.log(queue.toString())
// queue.enQueue('yao')
// console.log(queue.size())
// queue.deQueue()
// console.log(queue.peek())
// console.log(queue.toString())
// queue.clear()
// console.log(queue.size())

