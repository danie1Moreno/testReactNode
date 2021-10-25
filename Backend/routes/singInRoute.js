const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/model.js");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/.env" });

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "El usuario no existe" });
  } else {
    const auth = await user.validatePass(password);
    if (!auth) {
      return res.status(404).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    res.status(200).json({ auth, token });
  }
});

module.exports = router;
