const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    favoritesG: Schema.Types.Mixed,
    favoritesS: Schema.Types.Mixed,
  },
  {
    versionkey: false,
  }
);

userSchema.methods.encryptPass = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

userSchema.methods.validatePass = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = model("users", userSchema);
