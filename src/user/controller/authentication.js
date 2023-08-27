const { user } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const hash = require("../../../utils/hash");
const { tokenUser } = require("../../../utils/token");

class authentication {
  async tokenRefresh(req, res) {
    const { tokenRefresh } = req.body;
    try {
      const response = await user.findOne({
        where: {
          tokenRefresh,
        },
      });

      if (!response) {
        return responseJSON({
          res,
          data: "token refresh invalid !",
          status: 400,
        });
      }

      await delete response.dataValues.token;
      await delete response.dataValues.tokenRefresh;

      const generateToken = tokenUser.createToken(response.dataValues);
      const generateTokenRefresh = tokenUser.createRefreshToken(
        response.dataValues
      );

      if (generateToken) {
        await response.update({
          token: generateToken,
          tokenRefresh: generateTokenRefresh,
        });
      }

      responseJSON({
        res,
        data: {
          type: "Bearer",
          token: generateToken,
          tokenRefresh: generateTokenRefresh,
        },
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
  async login(req, res) {
    const { phoneNumber, password } = req.body;

    try {
      const response = await user.findOne({
        where: {
          phoneNumber,
          password: hash(password),
        },
        attributes: {
          exclude: ["password", "token"],
        },
      });

      await delete response.dataValues.token;
      await delete response.dataValues.tokenRefresh;

      const generateToken = tokenUser.createToken(response.dataValues);
      const generateTokenRefresh = tokenUser.createRefreshToken(
        response.dataValues
      );

      if (generateToken) {
        await response.update({
          token: generateToken,
          tokenRefresh: generateTokenRefresh,
        });
      }

      await delete response.dataValues.token;
      await delete response.dataValues.tokenRefresh;

      responseJSON({
        res,
        data: {
          result: response.dataValues,
          authentication: {
            type: "Bearer",
            token: generateToken,
            tokenRefresh: generateTokenRefresh,
          },
        },
        status: 200,
      });
    } catch (error) {
      console.log(error, "<==== Error");
    }
  }
  async register(req, res) {
    try {
      const response = await user.findAll();

      responseJSON({
        res,
        data: response,
        status: 200,
      });
    } catch (error) {
      console.log(error, "<==== Error");
    }
  }
}

module.exports = new authentication();
