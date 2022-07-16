export class Deque {
  private items
  private count
  private lowestCount
  constructor() {
    this.items = {}
    this.count = 0 // 控制队列的大小
    this.lowestCount = 0 // 追踪队列的第一个元素
  }
  addFront(element) {
    // 1. 若队列为空，则直接从后面添加即可
    if(this.isEmpty()) {
      this.addBack(element)
    } else if(this.lowestCount > 0) { // 2. 若队列有从前面移除过，则移动前端并赋值
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else { // 3. 没有从前端移除过队列，且一直从后端添加的；
      // 使用对象作为队列，理论上可以将 lowestCount 置为负值；
      // 便于理解，这里演示使用数组作为队列时
      // 要想在第一位添加一个新元素，必须将所有元素后移一位，空出第一个位置，才能进行赋值
      for(let i = this.count; i > 0; i--) { 
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  addBack(element) {
    this.items[this.count] = element
    this.count++
  }

  removeFront() {
    if (this.isEmpty()) return undefined
    const result = this.items[this.lowestCount] // 1. 取出
    delete this.items[this.lowestCount] // 2. 删除
    this.lowestCount++ // 3. 移动前端
    return result // 返回
  }

  removeBack() {
    if (this.isEmpty()) return undefined
    this.count-- // 1.移动后端
    const result = this.items[this.count] // 2. 取出
    delete this.items[this.count] // 3. 删除
    return result // 返回
  }

  peekFront() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }

  peekBack() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
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

const queue = new Deque()
console.log(queue.isEmpty())
queue.addBack('qiao')
queue.addFront('tian')
queue.addBack('yao')
console.log(queue.toString())
console.log(queue.size())
queue.removeFront()
console.log(queue.peekFront())
console.log(queue.toString())
queue.clear()
console.log(queue.size())

