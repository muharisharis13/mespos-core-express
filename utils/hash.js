const crypto = require("crypto");

function hash(data) {
  if (!data) {
    throw new Error("password for has is required !");
  }
  return crypto.createHash("md5").update(data).digest("hex");
}

module.exports = hash;
