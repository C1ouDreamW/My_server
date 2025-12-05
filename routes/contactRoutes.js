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
  const receivedID = req.body.ID
  const receivedEmail = req.body.email
  const receivedMessage = req.body.message
  const isVisible = req.body.isVisible
  console.log("收到发来的名字：", receivedName);
  if (receivedName) {
    const newContact = new Contact({
      name: receivedName,
      ID: receivedID,
      email: receivedEmail,
      message: receivedMessage,
      isVisible: isVisible,
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

router.get('/contact', async (req, res) => {
  try {
    const messages = await Contact.find({ isVisible: true }).sort({ date: -1 });
    res.json(messages);
    console.log("已向前端发送数据包。");
  } catch (error) {
    res.status(500).json({ message: `留言板数据获取失败，错误信息${error}` });
  }


})

module.exports = router;