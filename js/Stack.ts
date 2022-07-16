export class Stack {
  private items: any[]
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  clear() {
    this.items = []
  }

  size() {
    return this.items.length
  }
}

export class StackObj {
  private count: number
  private items: object

  constructor() {
    this.items = {}
    this.count = 0
  }

  push(element) {
    this.items[this.count] = element
    this.count++
  }

  pop() {
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }


  clear() {
    this.items = {}
    this.count = 0
  }
  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  toString() {
    if (this.isEmpty()) return ''

    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}