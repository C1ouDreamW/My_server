const btn = document.querySelector('.btn');
const username = document.querySelector('#name');
const userqq = document.querySelector('#qq');
const useremail = document.querySelector('#email');
const usermessage = document.querySelector('#message');
const messageBoard = document.querySelector('#message-board-content');
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

  // 发送数据包给后端
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
        usermessage.value = '';
        loadMessages();
      } else {
        alert("发送失败" + data.message);
      }
    })

    .catch(error => {
      console.log("发生错误，", error);
      alert("无法连接到服务器！");
    });
})

// 留言板部分



// 定义一个获取留言的函数
function loadMessages() {
  fetch('https://my-first-api-k6vk.onrender.com/api/contact')
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        messageBoard.innerHTML = '<p>还没有人留言，快来抢沙发！</p>';
        return;
      }

      messageBoard.innerHTML = '';

      data.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'msg-card';

        const time = new Date(msg.date).toLocaleString();

        card.innerHTML = `
            <div class="msg-header">
                <strong>${msg.name}</strong> 
                <span style="font-size:0.8em; color:#888;">(${time})</span>
            </div>
            <div class="msg-content">
                ${msg.message || "这家伙很懒，什么都没写"} 
            </div>
            <div style="font-size: 0.8em; color: gray;">QQ: ${msg.QQ}</div>
        `;

        // 把卡片塞进留言板里
        messageBoard.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      messageBoard.innerHTML = '<p style="color:red">加载失败了...</p>';
    });
}

loadMessages();