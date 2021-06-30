input为什么不支持after和before伪类
1. <input>元素的内容模型为空，没有独立的闭合标签，无法容纳别的标签作为自身的子元素

2. 内容为“哈哈1”的元素将成为input的子元素,这与第一点自相矛盾

3. input，img，iframe等元素都不能包含其他元素，所以不能通过伪元素插入内容。

- 可替换元素
- 可替换元素的展现效果不是由css来控制的，这些元素是一种外部对象，他们的外观渲染，是独立于css的
- css可以影响可替换元素的位置，但是不会影响到可替换元素自身的内容

- 可替换元素有哪些？
- 典型的可替换元素
    - iframe
    - video
    - embed
    - img
- 仅在特定情况下被作为可替换元素
    - option
    - audio
    - canvas
    - object
    - applet
    - input （type为image时）
