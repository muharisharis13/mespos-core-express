const responseJSON = require("../../../utils/responseJSON");
const { user } = require("../../../models");
const hash = require("../../../utils/hash");
const jwt = require("jsonwebtoken");

class middleware {
  decodeToken(req) {
    const token = req.headers?.authorization?.split(" ")[1];
    var decoded = jwt.verify(token, process.env.TOKEN_SECURITY);

    return decoded;
  }
  async isHaveToken(req, res, next) {
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

    const getToken = await user.findOne({
      where: {
        token,
      },
    });
    if (!getToken) {
      return responseJSON({
        res,
        status: 401,
        data: "invalid token !",
      });
    }

    next();
  }

  async findUser(req, res, next) {
    try {
      const findByuPhoneNumber = await user.findOne({
        where: {
          phoneNumber: req.body.phoneNumber,
        },
      });

      if (!findByuPhoneNumber) {
        return responseJSON({ res, data: "phone number is not found !" });
      }

      const response = await user.findOne({
        where: {
          phoneNumber: req.body.phoneNumber,
          password: hash(req.body.password),
        },
      });
      if (!response) {
        return responseJSON({ res, data: "password incorrect !" });
      }
      next();
    } catch (error) {
      return responseJSON({ res, data: error.message });
    }
  }

  validate() {
    function formRefreshToken(req, res, next) {
      if (!req.body.tokenRefresh) {
        return responseJSON({ res, data: "field tokenRefresh is required !" });
      }

      next();
    }

    return {
      formRefreshToken,
    };
  }
  checkFormAuthentication(req, res, next) {
    if (!req.body.phoneNumber) {
      return responseJSON({ res, data: "field phoneNumber is required !" });
    }
    if (!req.body.password) {
      return responseJSON({ res, data: "field password is required !" });
    }

    next();
  }
}

module.exports = new middleware();
