require('dotenv').config();
const API=process.env.URL;
const token = localStorage.getItem("token");
const socket = io(process.env.URL, {
  auth: { token }
});

const msgInput = document.getElementById("msg");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

msgInput.addEventListener("input", () => {
  socket.emit("typing", { receiverId: "RECEIVER_ID" });
});

msgInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    socket.emit("send-message", {
      receiverId: "RECEIVER_ID",
      message: msgInput.value
    });
    msgInput.value = "";
  }
});

socket.on("receive-message", (msg) => {
  messages.innerHTML += `<p>${msg.message}</p>`;
});

socket.on("typing", () => {
  typing.innerText = "Typing...";
  setTimeout(() => typing.innerText = "", 1000);
});
