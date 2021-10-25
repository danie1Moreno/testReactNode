const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/.env" });

const connectDB = async () => {
  await mongoose
    .connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("db connect"))
    .catch((err) => console.error("Something is wrong"));
};
module.exports = connectDB;
