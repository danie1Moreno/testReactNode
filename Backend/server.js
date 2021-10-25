const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const api = express();
const connectDB = require("./db.js");

let puerto = 5000;

//settings
connectDB();
dotenv.config({ path: "./env/.env" });
api.set("port", process.env.port || puerto);

//middelwares
api.use(cors());
api.use(express.json());

//routes
api.use("/app/singup", require("./routes/singUpRoute.js"));
api.use("/app/login", require("./routes/singInRoute.js"));
api.use("/favorites", require("./routes/favorites.js"));
api.use("/twitchgames", require("./routes/twitchGames.js"));
api.use("/twitchstreamers", require("./routes/twitchStreamers.js"));
//static
api.listen(puerto, () => {
  console.log("Server Ready");
});
