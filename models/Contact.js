const mongoose = require('mongoose') // 引入mongoose

const contactSchema = new mongoose.Schema({
  name: String,
  QQ: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// 创建Schema实例，第一个参数为数据库表名，
// 如存储在'contacts'文件夹下
// 数据类型为contactSchema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
// 这一步相当于return一个值
// 当其他文件使用require()导入这个文件时，执行这个文件的代码
// 并最后将module.exports赋值给引用变量