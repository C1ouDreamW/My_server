// 1.引入express工具包
const express = require('express')

// 2.创建一个web服务器应用实例，名字叫做app
const app = express();

// 3.定义端口号
const port = 3000;

// 4.定义路由
// 处理get请求的路由方法，当有人访问'/'（网站根目录）时，执行函数
//    req (request) = 前端发来的请求
//    res (response) = 我们发回去的响应

// (函数参数) => {函数体} 是函数的简洁
app.get('/', (req, res) => {
  res.send("你好！这是我的第一个后端服务器")
})

// 5.启动服务器
app.listen(port, () => {
  console.log(`服务器已启动，请在浏览器访问 http://localhost:${port}`)
});