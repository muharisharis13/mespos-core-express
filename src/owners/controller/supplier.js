const { supplier, sequelize } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");
const { Op } = require("sequelize");
const { paginate } = require("../../../utils/pagination");

const filterQuery = (query) => {
  delete query.page;
  delete query.pageSize;
  let newObj = {};

  for (let [k, v] of Object.entries(query)) {
    newObj[`$${k}$`] = {
      [Op.like]: `%${v ?? "*"}%`,
    };
  }

  return newObj;
};

class supplierController {
  async getSupplierPagination(req, res) {
    const { page = 1, pageSize = 1 } = req.query;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getSupplier = await supplier.findAndCountAll({
        limit: paginate(req.query).limit,
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        include: {
          all: true,
          attributes: {
            exclude: ["id"],
          },
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
          limit: paginate(req.query).limit,
          pageSize: parseInt(pageSize),
          query: req.query,
          ...getSupplier,
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
  async createSupplier(req, res) {
    const { supplier_name, phone, address_1, address_2, descriptions } =
      req.body;
    const t = await sequelize.transaction();
    try {
      const decodeToken = decodeTokenOwner(req);
      const createSupplier = await supplier.create(
        {
          uuid: uuidv4(),
          supplier_name,
          phone,
          address_1,
          address_2,
          descriptions,
          ownerId: decodeToken?.ownerId,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return responseJSON({
        res,
        data: createSupplier,
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

module.exports = new supplierController();
