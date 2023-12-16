const { sequelize, payment_type } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");
const { Op, where } = require("sequelize");
const { paginate } = require("../../../utils/pagination");
const filterQuery = (query) => {
  delete query.page;
  delete query.limit;
  let newObj = {};

  for (let [k, v] of Object.entries(query)) {
    newObj[`$${k}$`] = {
      [Op.like]: `%${v ?? "*"}%`,
    };
  }

  return newObj;
};

class paymentController {
  async changeDisplayStatus(req, res) {
    const { uuid } = req.params;
    const { display } = req.body;
    try {
      const findPaymentType = await payment_type.findOne({
        where: {
          uuid,
        },
      });

      if (!findPaymentType) {
        return responseJSON({
          res,
          data: "Payment Type Not Found",
          status: 400,
        });
      }

      const updatePaymentType = await findPaymentType.update({
        display,
      });

      return responseJSON({
        res,
        data: updatePaymentType,
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
  async getPaymentPaginate(req, res) {
    const { page = 1, limit = 1 } = req.query;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getPaymentType = await payment_type.findAndCountAll({
        limit: parseInt(limit),
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        include: {
          all: true,
          nested: true,
        },
        where: {
          ownerId: decodeToken?.ownerId,
          ...filterQuery(req.query),
        },
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(getPaymentType.count / parseInt(limit)),
          query: req.query,
          ...getPaymentType,
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
  async createPayment(req, res) {
    const { payment_name, display } = req.body;
    const t = await sequelize.transaction();
    const decodeToken = decodeTokenOwner(req);
    try {
      const createPyamentType = await payment_type.create(
        {
          uuid: uuidv4(),
          payment_name,
          display,
          ownerId: decodeToken?.ownerId,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return responseJSON({
        res,
        data: createPyamentType,
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
}

module.exports = new paymentController();
