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
  // A.then() -> 等前面A完成之后，运行.then()括号内函数
  .then(() => console.log("成功连接到MongoDB数据库！"))
  // A.catch() -> 如果A执行时出现了异常err，运行.catch()括号内的函数
  .catch(err => console.log("数据库连接失败:", err));

// 注册路由
// 这里定义了公共前缀 '/api'
// 凡是 contactRoutes 里定义的路径，前面都要自动加上 /api
// 比如 contactRoutes 里的 '/test'，现在的访问路径是 '/api/test'
app.use('/api', contactRoutes);
// 这一步app.use()把请求URL的/api/前都给去除掉，只留api/后面的地址，
// 然后传给contactRoutes在routes/contactRoutes.js里完成具体响应

app.listen(port, () => { console.log(`服务器已启动！my-first-api-k6vk.onrender.com`) });