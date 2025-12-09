const btn = document.querySelector('.btn');
const username = document.querySelector('#name');
const userid = document.querySelector('#id');
const useremail = document.querySelector('#email');
const usermessage = document.querySelector('#message');
const messageBoard = document.querySelector('#message-board-content');
const visibleCheck = document.querySelector('#visible-check');

import { showToast } from './toast.js'


// 发送消息
btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (username.value === '') {
    alert("请输入你的名字！");
    return;
  }
  if (userid.value === '') {
    alert("请输入你的ID！");
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
      ID: userid.value,
      email: useremail.value,
      message: usermessage.value,
      isVisible: visibleCheck.checked,
    })
  })

    .then(response => response.json()) // 把服务器回传的数据包解压成JSON
    .then(data => {
      // 处理服务器回复
      console.log("服务器回复说：", data);
      if (data.success) {
        if (visibleCheck.checked) {
          showToast("😽发送成功！即将上墙~", "success");
        } else {
          showToast("😽发送成功！已悄悄投递给作者~", "success");
        }
        usermessage.value = '';
        loadMessages();
      } else {
        alert("发送失败" + data.message, 'error');
      }
    })
    .catch(error => {
      console.log("发生错误，", error);
      showToast('无法连接到服务器，请检查网络连接或联系管理员', 'error');
    });
})

// 留言板部分

// 定义一个获取留言的函数
function loadMessages() {
  return fetch('https://my-first-api-k6vk.onrender.com/api/contact')
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        messageBoard.innerHTML = '<p>还没有人留言，快来当第一名吧！</p>';
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
            <div style="font-size: 0.8em; color: gray;">ID: ${msg.ID}</div>
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

const messagePanel = document.getElementById('message-panel');
const contactPanel = document.getElementById('contact-panel');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');

messagePanel.addEventListener('click', function () {
  this.classList.add('open');
});

// contactPanel.addEventListener('click', function () {
//   messagePanel.classList.remove('open');
// });

// 展开/收回按钮
closeSidebarBtn.addEventListener('click', function (e) {
  // 因为这个按钮在 messagePanel 里面，不阻止的话，点击它会被当成点击面板，导致收起又立刻展开
  e.stopPropagation();

  messagePanel.classList.remove('open');
});

// 刷新按钮逻辑
const refreshBtn = document.getElementById('refresh-btn');

refreshBtn.addEventListener('click', function () {
  refreshBtn.classList.add('spin');
  loadMessages()
    .finally(() => {
      setTimeout(() => {
        refreshBtn.classList.remove('spin');
        showToast('留言已刷新', 'success');
      }, 500);
    });
});

