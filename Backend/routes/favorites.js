const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const User = require("../models/model.js");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/.env" });

router.get("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.query.userid, { password: 0 });
  if (!user) {
    return res.status(404).json({ message: "Usuario no existe" });
  }

  res.json({ dataG: user.favoritesG, dataS: user.favoritesS });
});

router.post("/", verifyToken, async (req, res) => {
  if (req.body.type === "Game") {
    const game = {
      id: req.body.id,
      name: req.body.name,
      box_art_url: req.body.box_art_url,
    };
    await User.findByIdAndUpdate(
      req.body.user_id,
      {
        $push: { favoritesG: game },
      },
      { safe: true, upsert: true, new: true }
    );
    res.status(200);
  } else if (req.body.type === "Stmr") {
    const Stmr = {
      id: req.body.id,
      user_name: req.body.user_name,
      language: req.body.language,
      game_name: req.body.game_name,
    };
    await User.findByIdAndUpdate(
      req.body.user_id,
      {
        $push: { favoritesS: Stmr },
      },
      { safe: true, upsert: true, new: true }
    );
    res.status(200);
  } else if (req.body.type === "GameD") {
    await User.findByIdAndUpdate(
      req.body.user_id,
      {
        $pull: { favoritesG: { id: req.body.id } },
      },
      { safe: true, upsert: true }
    );
    const user = await User.findById(req.body.user_id, { password: 0 });
    res.json({ dataG: user.favoritesG, dataS: user.favoritesS });
  } else if (req.body.type === "StmrD") {
    await User.findByIdAndUpdate(
      req.body.user_id,
      {
        $pull: { favoritesS: { id: req.body.id } },
      },
      { safe: true, upsert: true }
    );
    const user = await User.findById(req.body.user_id, { password: 0 });
    res.json({ dataG: user.favoritesG, dataS: user.favoritesS });
  } else if (req.body.type === "GameUp") {
    await User.updateOne(
      {
        _id: req.body.user_id,
        "favoritesG.id": req.body.id,
      },
      {
        $set: { "favoritesG.$.name": req.body.name },
      },
      { safe: true, upsert: true }
    );
    const user = await User.findById(req.body.user_id, { password: 0 });
    res.json({ dataG: user.favoritesG, dataS: user.favoritesS });
  } else if (req.body.type === "StmrUp") {
    await User.updateOne(
      {
        _id: req.body.user_id,
        "favoritesS.id": req.body.id,
      },
      {
        $set: { "favoritesS.$.user_name": req.body.user_name },
      },
      { safe: true, upsert: true }
    );
    const user = await User.findById(req.body.user_id, { password: 0 });
    res.json({ dataG: user.favoritesG, dataS: user.favoritesS });
  }
});

module.exports = router;
