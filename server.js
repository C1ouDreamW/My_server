const express = require('express');
const cors = require('cors'); // 1.引入cors
const app = express();
const port = 3000;

// 2.使用中间件
app.use(cors()); // 允许跨域
app.use(express.json()) // 允许服务器解析前端发来的JSON数据

// 路由1：测试接口
app.get('/api/test', (req, res) => {
  const mydata = {
    message: "连接成功！",
    time: new Date.toLocaleString(),
    author: "C1ouD",
  };
  res.json(mydata);
});

// 路由2：接受前端提交的表单数据
app.post('/api/contact', (req, res) => {
  const receivedName = req.body.name; // req.body 就是前端发过来的数据包
  console.log("收到前端发来的名字：", receivedName);
  if (receivedName) {
    res.json({
      success: true,
      message: `服务器已接收，${receivedName},很高兴认识你！`
    })
  } else {
    res.status(400).json({
      success: false,
      message: "服务器没收到你的名字！"
    })
  }
})

app.listen(port, () => { console.log(`服务器已启动！my-first-api-k6vk.onrender.com`) });