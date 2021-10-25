const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/model.js");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/.env" });

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    res
      .status(409)
      .json({ message: "Ya existe un usuario registrado con este correo" });
  } else {
    const initialFav = [];
    const initialviews = [];
    const newuser = new User({
      email: email,
      password: password,
      favoritesG: initialFav,
      favoritesS: initialviews,
    });
    newuser.password = await newuser.encryptPass(password);
    await newuser.save();
    const token = jwt.sign({ id: newuser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    res.json({ auth: true, token });
  }
});

module.exports = router;
