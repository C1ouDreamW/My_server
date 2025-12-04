const btn = document.querySelector('.btn');
const username = document.querySelector('#name');
const userqq = document.querySelector('#qq');
const useremail = document.querySelector('#email');
const usermessage = document.querySelector('#message');
btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (username.value === '') {
    alert("请输入你的名字！");
    return;
  }
  if (userqq.value === '') {
    alert("请输入你的QQ号！");
    return;
  }
  if (useremail.value === '') {
    alert("请输入你的邮箱！");
    return;
  }

  // 发送请求给后端
  fetch('https://my-first-api-k6vk.onrender.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // 把数据打包成JSON
    body: JSON.stringify({
      name: username.value,
      QQ: userqq.value,
      email: useremail.value,
      message: usermessage.value,
    })
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