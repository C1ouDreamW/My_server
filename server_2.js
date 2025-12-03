const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // 允许服务器（app）理解JSON格式的数据

// 路由1 ：主页
app.get('/', (req, res) => { res.send('你好！这是我的服务器！') });


// 路由2 ：当访问 /api/text 时，返回数据包
app.get('/api/test', (req, res) => {
  const mydata = {
    message: "连接成功",
    time: new Date().toLocaleString(),
    author: "C1ouD"
  }
  res.json(mydata);
})

app.listen(port, () => { console.log(`服务器正在运行！http://localhost:${port}`) });