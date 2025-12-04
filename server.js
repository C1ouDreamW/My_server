const express = require('express');
const cors = require('cors'); // 1.引入cors
const mongoose = require('mongoose') // 引入mongoose
require('dotenv').config(); // 读取.env里的密码配置

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = 3000;

// 2.使用中间件
app.use(cors()); // 允许跨域
app.use(express.json()) // 允许服务器解析前端发来的JSON数据

const mongoURI = process.env.MONGO_URI
if (!mongoURI) {
  console.log("Error:未找到MONGO_URI环境变量，请检查.env...")
}
mongoose.connect(mongoURI)
  .then(() => console.log("成功连接到MongoDB数据库！"))
  .catch(err => console.log("数据库连接失败:", err));

// 注册路由
// 这里定义了公共前缀 '/api'
// 凡是 contactRoutes 里定义的路径，前面都要自动加上 /api
// 比如 contactRoutes 里的 '/test'，现在的访问路径是 '/api/test'
app.use('/api', contactRoutes);

app.listen(port, () => { console.log(`服务器已启动！my-first-api-k6vk.onrender.com`) });