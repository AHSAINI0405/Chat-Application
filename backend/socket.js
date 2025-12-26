const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");

module.exports = (io) => {
  // ===== SOCKET AUTH =====
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    // ===== USER ONLINE =====
    const user = await User.findByIdAndUpdate(
      socket.userId,
      { isOnline: true, socketId: socket.id },
      { new: true }
    );

    socket.broadcast.emit("user-online",{userId:user._id});
    // ===== TYPING =====
    socket.on("typing", async ({ receiverId }) => {
      const receiver = await User.findById(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("typing", {
          senderName: user.name
        });
      }
    });

    // ===== SEND MESSAGE =====
    socket.on("send-message", async ({ receiverId, message }) => {
      // save message
      const msg = await Message.create({
        senderId: socket.userId,
        receiverId,
        message
      });

      const receiver = await User.findById(receiverId);

      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("receive-message", {
          _id: msg._id,
          senderId: socket.userId,
          senderName: user.name,   // 🔥 IMPORTANT
          message: msg.message,
          createdAt: msg.createdAt
        });
      }
    });

    // ===== DISCONNECT =====
    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        socketId: null
      });
      socket.broadcast.emit("user-offline", {
    userId: socket.userId
  });
    });
  });
};
