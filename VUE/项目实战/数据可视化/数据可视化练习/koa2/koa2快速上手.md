快速上手koa2:
1.检查node环境
node -v

2.安装koa
npm init -y
npm insatll koa

3.创建并编写app.js文件
(1).创建koa对象
(2).编写响应函数(中间件)
(3).监听端口

4.启动服务器
node app.js



koa2中间件的特点：

1.koa对象通过use方法加入一个中间件

2.一个中间件就是一个函数

3.中间件的执行顺序符合洋葱模型

4.内层中间件能否执行取决于外层中间件的next函数是否调用

5.调用next函数得到的是promise对象