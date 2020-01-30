const { Router } = require("express");
const router = new Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.post("/api/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("You are not a menmber try again");
  }
});

router.post("/api/auth", async (req, res) => {
  const token = await User.login(req.body);
  const verify = jwt.verify(token, secret);
  if (token) {
    res.json(verify);
    console.log(verify);
  }
});

module.exports = router;