const express = require('express');
const cors = require('cors'); // 引入cors，解决前后端分离的跨域问题
const mongoose = require('mongoose') // 引入mongoose

// 在本地运行时dotenv才会启用，调取.env中的变量
// 在云端服务器运行时由于没有.env文件，dotenv会自动忽略
require('dotenv').config(); // 读取.env里的键值对塞进内存的环境变量中

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// 使用中间件
app.use(cors()); // 允许跨域
app.use(express.json()) // 允许服务器解析前端发来的JSON数据

const mongoURI = process.env.MONGO_URI
if (!mongoURI) {
  console.log("Error:未找到MONGO_URI环境变量，请检查.env...")
}
mongoose.connect(mongoURI)
  // A.then() -> 等前面A完成之后，运行.then()括号内函数
  .then(() => console.log("成功连接到MongoDB数据库！"))
  // A.catch() -> 如果A执行时出现了异常err，运行.catch()括号内的函数
  .catch(err => console.log("数据库连接失败:", err));

app.get('/', (req, res) => {
  res.send("哈喽，这是我的后端服务器，基于Node.js运行环境、Express框架，数据库使用MongoDB搭建  --  By C1ouD");
})

// 注册api路由
// 这里定义了公共前缀 '/api' 凡是 contactRoutes 里定义的路径，前面都要自动加上 /api
app.use('/api', contactRoutes);
// 这一步app.use()把请求URL的/api/前都给去除掉，只留api/后面的地址，然后传给contactRoutes在routes/contactRoutes.js里完成具体响应

// 404
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "这是未定义的路由地址，这里什么都没有！",
    path: req.path,
  });
});

app.listen(port, () => { console.log(`服务器已启动！my-first-api-k6vk.onrender.com`) });