const jwt = require("jsonwebtoken");

exports.decodeTokenOwner = (req) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECURITY);

    return decodeToken?.data;
  } catch (error) {
    throw Error(error.message || error);
  }
};
