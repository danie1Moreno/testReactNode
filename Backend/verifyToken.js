const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/.env" });

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, token: "No Token" });
  }
  const decodec = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodec) {
    return res.status(401).json({ auth: false, token: "Invalid Token" });
  }
  req.userId = decodec.id;
  next();
}

module.exports = verifyToken;
