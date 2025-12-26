const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  console.log("Users API hit by:", req.user.id);
    const users = await User.find({ _id: { $ne: req.user.id } });
  
  res.json(users);
});

module.exports = router;
