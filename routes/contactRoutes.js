// routes/contactRoutes.js

const express = require('express');
const router = express.Router(); // 创建一个路由器实例
const Contact = require('../models/Contact') // 引入数据库模型

router.get('/test', (req, res) => {
  res.json({
    message: "连接成功，信息来自contactRoutes.js",
    time: new Date().toLocaleString(),
    author: "C1ouD"
  })
})

router.post('/contact', async (req, res) => {
  const receivedName = req.body.name
  const receivedQQ = req.body.QQ
  const receivedEmail = req.body.email
  console.log("收到发来的名字：", receivedName);
  if (receivedName) {
    const newContact = new Contact({
      name: receivedName,
      QQ: receivedQQ,
      email: receivedEmail,
    })
    try {
      await newContact.save();
      res.json({
        success: true,
        message: `服务器已接收，${receivedName}`,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "数据库保存失败"
      })
    }
  } else {
    res.status(400).json({
      success: false,
      message: "服务器没收到你的名字！"
    })
  }
})

module.exports = router;