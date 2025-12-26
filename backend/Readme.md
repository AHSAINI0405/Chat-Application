💬 Real-Time Chat Application (Socket.IO + MongoDB)

A full-stack real-time chat application built using Node.js, Express, MongoDB, Socket.IO, HTML, CSS, and JavaScript.
It supports user authentication, one-to-one messaging, typing indicators, and real-time online/offline status.

🚀 Features
✅ Authentication

User Registration

User Login

JWT-based authentication

Auth guard for protected pages

💬 Chat Features

Real-time 1-to-1 messaging

Sender name displayed with each message

Messages delivered instantly using Socket.IO

🟢 Presence System

Online / Offline user indicator

Updates instantly when user connects or disconnects

✍ Typing Indicator

Shows when the other user is typing (real-time)

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

JSON Web Token (JWT)

Frontend

HTML

CSS (Tailwind / custom styles)

JavaScript

Socket.IO Client

📁 Project Structure
Chat App/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── socket.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── chat.html
│   ├── chat.js
│   └── styles.css
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/chat-app.git
cd chat-app

2️⃣ Backend Setup
cd backend
npm install

Create .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatapp
JWT_SECRET=your_secret_key

Start Backend Server
node server.js


Backend will run at:

http://localhost:5000

3️⃣ Frontend Setup

Open frontend folder and simply open:

register.html → create account
login.html    → login
chat.html     → chat interface


⚠️ Important:
Do NOT run HTML files from terminal.
Open them using browser (double-click or right-click → open with browser).

🔌 Socket.IO Events Used
Client → Server

send-message

typing

Server → Client

receive-message

typing

user-online

user-offline

🧠 How It Works

User logs in → JWT saved in localStorage

Socket connects with JWT authentication

User marked online in MongoDB

Messages sent in real-time using Socket.IO

Online/offline status broadcast to all users

