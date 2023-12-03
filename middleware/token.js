const { User_accounts } = require("../models");
const hash = require("../utils/hash");
const jwt = require("jsonwebtoken");
const responseJSON = require("../utils/responseJSON");

class tokenClass {
  async isHaveTokenOwner(req, res, next) {
    const type = req.headers?.authorization?.split(" ")[0];
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return responseJSON({
        res,
        status: 401,
        data: "Token is Requred !",
      });
    }

    if (type !== "Bearer") {
      return responseJSON({
        res,
        status: 401,
        data: "Type Token is not Bearer !",
      });
    }

    try {
      const decodeToken = jwt.verify(token, process.env.TOKEN_SECURITY);

      const getUserAccount = await User_accounts.findOne({
        where: {
          uuid: decodeToken.data.uuid,
        },
      });

      if (!getUserAccount) {
        return responseJSON({
          res,
          status: 401,
          data: "user invalid !",
        });
      }

      next();
    } catch (error) {
      return responseJSON({
        res,
        status: 401,
        data: error.message || error,
      });
    }
  }
}

module.exports = new tokenClass();
