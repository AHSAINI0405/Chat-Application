// ===== AUTH GUARD =====
const token = localStorage.getItem("token");
const myId = localStorage.getItem("userId");

const API="https://chat-application-phal.onrender.com";
if (!token || !myId) {
  alert("Please login first");
  window.location.href = "login.html";
}

// ===== SOCKET CONNECTION =====
const socket = io(`${API}`, {
  auth: { token }
});

// ===== DOM ELEMENTS =====
const usersList = document.getElementById("usersList");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const typing = document.getElementById("typing");

let selectedUser = null;

// ===== FETCH USERS =====
fetch(`${URL}/api/users`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(users => {
    usersList.innerHTML = "";
    users.forEach(u => {
      if (u._id !== myId) {
        const li = document.createElement("li");

        // 🔥 VERY IMPORTANT
        li.id = `user-${u._id}`;

        li.className =
          "flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200";

        li.innerHTML = `
          <span class="status-dot w-3 h-3 rounded-full ${
            u.isOnline ? "bg-green-500" : "bg-gray-400"
          }"></span>
          <span>${u.name}</span>
        `;

        li.onclick = () => selectUser(u);
        usersList.appendChild(li);
      }
    });
  });


// ===== SELECT USER =====
function selectUser(user) {
  selectedUser = user;
  messages.innerHTML = `
    <p class="text-center text-gray-500">
      Chatting with ${user.name}
    </p>
  `;
}

// ===== TYPING INDICATOR =====
messageInput.addEventListener("input", () => {
  if (selectedUser) {
    socket.emit("typing", { receiverId: selectedUser._id });
  }
});

// ===== SEND MESSAGE =====
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && selectedUser && messageInput.value.trim()) {
    const msg = messageInput.value;

    socket.emit("send-message", {
      receiverId: selectedUser._id,
      message: msg
    });

    // show own message
    messages.innerHTML += `
      <p class="text-right text-blue-600">
        <b>You:</b> ${msg}
      </p>
    `;

    messageInput.value = "";
  }
});

// ===== RECEIVE MESSAGE =====
socket.on("receive-message", msg => {
  messages.innerHTML += `
    <p class="text-left text-green-600">
      <b>${msg.senderName}:</b> ${msg.message}
    </p>
  `;
});

// ===== SHOW TYPING =====
socket.on("typing", () => {
  typing.innerText = "Typing...";
  setTimeout(() => {
    typing.innerText = "";
  }, 700);
});
