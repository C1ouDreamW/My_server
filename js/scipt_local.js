const btn = document.querySelector('.btn');
const username = document.querySelector('#name');
btn.addEventListener("click", function (event) {
  event.preventDefault();
  // if (username.value == '') {
  //   alert("请输入你的名字！")
  // } else {
  //   console.log(`你好，${username.value}！消息已发送。`);
  //   alert("发送成功！")
  // }
  if (username.value === '') {
    alert("请输入你的名字！");
    return;
  }

  // 发送请求给后端
  fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // 把数据打包成JSON
    body: JSON.stringify({ name: username.value })
  })

    .then(response => response.json()) // 把服务器回传的数据包解压成JSON
    .then(data => {
      // 处理服务器回复
      console.log("服务器回复说：", data);
      if (data.success) {
        alert(data.message);
      } else {
        alert("发送失败" + data.message);
      }
    })

    .catch(error => {
      console.log("发生错误，", error);
      alert("无法连接到服务器！");
    });
})