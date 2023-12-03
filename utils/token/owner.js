const jwt = require("jsonwebtoken");

const secretToken = process.env.TOKEN_SECURITY;
const tokenLife = "1m"; // 1 menit
class Token {
  createToken(data) {
    if (!data) throw new Error("Data Token is Not Found !");

    return jwt.sign((data = { data }), secretToken);
  }

  createRefreshToken = (data) => {
    if (!data) throw new Error("Data Refresh Token is Not Found !");

    return jwt.sign((data = { data }), secretToken);
  };
}

module.exports = new Token();
