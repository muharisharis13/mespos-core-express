const {
  Owners,
  User_accounts,
  Outlets,
  sequelize,
} = require("../../../models");
const hash = require("../../../utils/hash");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
const { createToken } = require("../../../utils/token/owner");

class authentication {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user_account = await User_accounts.findOne({
        where: {
          email,
        },
        include: {
          all: true,
          nested: true,
        },
        attributes: {
          exclude: ["RoleId", "OwnerId"],
        },
      });

      if (!user_account) {
        return responseJSON({
          res,
          data: "Email Not Found",
          status: 400,
        });
      }

      const checkPassword = await User_accounts.findOne({
        where: {
          email,
          password: hash(password),
        },
      });

      if (!checkPassword) {
        return responseJSON({
          res,
          data: "Password Incorrect !",
          status: 401,
        });
      }

      const token = createToken(user_account);

      return responseJSON({
        res,
        data: {
          user_account,
          token_type: "bearer",
          token,
        },
        status: 200,
      });
    } catch (error) {
      return responseJSON({
        res,
        data:
          error.errors?.map((item) => ({
            message: item.message,
          })) ||
          error.message ||
          error,
        status: 500,
      });
    }
  }
  async register(req, res) {
    const {
      fullname,
      country,
      province,
      city,
      address,
      district,
      sub_distirct,
      outlet_name,
      email,
      password,
      status = "active",
    } = req.body;

    const t = await sequelize.transaction();

    try {
      const owner = await Owners.create(
        {
          uuid: uuidv4(),
          fullname,
          country,
          province,
          city,
          address,
          district,
          sub_distirct,
        },
        {
          transaction: t,
        }
      );
      const outlet = await Outlets.create(
        {
          uuid: uuidv4(),
          outlet_name,
          ownerId: owner.id,
        },
        {
          transaction: t,
        }
      );
      const user_account = await User_accounts.create(
        {
          uuid: uuidv4(),
          email,
          password: hash(password),
          status,
          ownerId: owner.id,
          roleId: 1,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return responseJSON({
        res,
        data: {
          owner,
          outlet,
          user_account,
        },
        status: 200,
      });
    } catch (error) {
      await t.rollback();
      return responseJSON({
        res,
        data:
          error.errors?.map((item) => ({
            message: item.message,
          })) ||
          error.message ||
          error,
        status: 500,
      });
    }
  }
}

module.exports = new authentication();
