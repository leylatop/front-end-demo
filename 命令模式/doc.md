# 命令模式总结
- command 是执行某些特定事情的指令
- 命令模式有一个command对象，对象一直被传递
- command对象中包含要执行的命令的方法


- 命令的创建者只关心命令执行的内容，无需知道命令的执行者是谁
- 命令的执行者只关心执行，无需知道命令本身的执行结果
- 包含一个中间绑定的方法