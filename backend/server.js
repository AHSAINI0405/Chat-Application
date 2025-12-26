require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

require("./socket")(io);

server.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
