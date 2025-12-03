const express = require('express');
const cors = require('cors'); // 1.引入cors
const app = express();
const port = 3000;
require('dotenv').config(); // 读取.env里的密码配置
const mongoose = require('mongoose') // 引入mongoose

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

// 定义数据模型(Schema) -> 储存的数据的形式是怎样的
const contactSchema = new mongoose.Schema({
  name: String, // 名字是字符串
  date: { type: Date, default: Date.now } // 日期默认是服务器当前时间
})

// 创建模型工具，用来操作数据库
const Contact = mongoose.model('Contact', contactSchema);

app.get('/', (req, res) => { console.log("哈喽，这是C1的第一个后端服务器！") });

// 路由1：测试接口
app.get('/api/test', (req, res) => {
  const mydata = {
    message: "连接成功",
    time: new Date().toLocaleString(),
    author: "C1ouD"
  }
  res.json(mydata);
})

// 路由2：接受前端提交的表单数据
app.post('/api/contact', async (req, res) => {
  const receivedName = req.body.name; // req.body 就是前端发过来的数据包
  console.log("收到前端发来的名字：", receivedName);
  if (receivedName) {
    // 创建一条新数据
    const newContact = new Contact({ name: receivedName });
    try {
      // 将数据保存到数据库, await 表示等待数据库存好新数据后再继续
      await newContact.save();
      console.log("数据已保存到数据库！");
      res.json({
        success: true,
        message: `服务器已接收，${receivedName},很高兴认识你！`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "数据库保存失败" });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "服务器没收到你的名字！"
    })
  }
})

app.listen(port, () => { console.log(`服务器已启动！my-first-api-k6vk.onrender.com`) });