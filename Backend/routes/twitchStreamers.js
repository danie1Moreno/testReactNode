const express = require("express");
const router = express.Router();
const axios = require("axios");

let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;

router.post("/", async (req, res) => {
  let token = await axios
    .post(url)
    .then((response) => {
      let token = response;
      return token;
    })
    .catch((error) => {
      console.log(error);
    });
  let getS = await axios
    .get("https://api.twitch.tv/helix/streams", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
        "Client-Id": process.env.CLIENT_ID,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).json(getS.data);
});

router.post("/many", async (req, res) => {
  let token = await axios
    .post(url)
    .then((response) => {
      let token = response;
      return token;
    })
    .catch((error) => {
      console.log(error);
    });
  let getS = await axios
    .get("https://api.twitch.tv/helix/streams?first=100", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
        "Client-Id": process.env.CLIENT_ID,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).json(getS.data);
});

module.exports = router;
