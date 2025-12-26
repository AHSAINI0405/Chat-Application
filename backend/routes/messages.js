const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { senderId: req.user.id, receiverId: req.params.id },
      { senderId: req.params.id, receiverId: req.user.id }
    ]
  });
  res.json(messages);
});

module.exports = router;
