const {
  Owners,
  User_accounts,
  Outlets,
  sequelize,
} = require("../../../models");
// const sequelize = require("sequelize");
const hash = require("../../../utils/hash");
const responseJSON = require("../../../utils/responseJSON");

class authentication {
  async login(req, res) {}
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
          outlet_name,
          ownerId: owner.id,
        },
        {
          transaction: t,
        }
      );
      const user_account = await User_accounts.create(
        {
          email,
          password: hash(password),
          status,
          ownerId: owner.id,
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
        data: error.message,
        status: 500,
      });
    }
  }
}

module.exports = new authentication();
