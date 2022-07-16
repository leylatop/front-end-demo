import { Queue } from './Queue'
// 模拟击鼓传花——只能往一个方向传
function hotPotato(elementsList, num) {
  const queue = new Queue()
  const eliminatedList:any[] = []

  for (let i = 0; i < elementsList.length; i++) {
    queue.enQueue(elementsList[i])
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enQueue(queue.deQueue())
    }
    eliminatedList.push(queue.deQueue())
  }

  return {
    eliminated: elementsList,
    winner: queue.deQueue()
  }
}

const names = ['1q', '2q', '3q', '4q', '5q']
const result = hotPotato(names, 7)
console.log(result)