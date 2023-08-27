const { user } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const middleware = require("../middleware");

class profile {
  async profile(req, res) {
    try {
      const decoded = middleware.decodeToken(req);

      const response = await user.findOne({
        where: {
          uuid: decoded.uuid,
        },
        attributes: {
          exclude: ["password", "token", "tokenRefresh"],
        },
      });

      if (!response) {
        return responseJSON({
          res,
          data: "User not found !",
          status: 400,
        });
      }

      responseJSON({
        res,
        data: response,
        status: 200,
      });
    } catch (error) {
      responseJSON({
        res,
        data: error.message,
        status: 500,
      });
    }
  }
}

module.exports = new profile();
