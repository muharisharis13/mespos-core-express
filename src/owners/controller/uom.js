const { uom, sequelize } = require("../../../models");
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

class uomcontroller {
  async deleteUom(req, res) {
    const { uuid } = req.params;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getUom = await uom.findOne({
        where: {
          ownerId: decodeToken?.ownerId,
          uuid,
        },
      });

      if (!getUom) {
        return responseJSON({
          res,
          data: "Uom does not exists",
          status: 400,
        });
      }

      await getUom.destroy();

      return responseJSON({
        res,
        data: "Successfully deleted data ",
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
  async updateUom(req, res) {
    const { uuid } = req.params;
    const { uom_name, uom_identifier, descriptions } = req.body;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getUom = await uom.findOne({
        where: {
          ownerId: decodeToken?.ownerId,
          uuid,
        },
      });

      if (!getUom) {
        return responseJSON({
          res,
          data: "Uom does not exists",
          status: 400,
        });
      }

      const updateuom = await getUom.update({
        uom_name,
        uom_identifier,
        descriptions,
      });

      return responseJSON({
        res,
        data: updateuom,
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
  async getUomPaginate(req, res) {
    const { page = 1, pageSize = 1 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      const getUom = await uom.findAndCountAll({
        limit: paginate(req.query).limit,
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["OwnerId"],
        },
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
          totalPages: Math.ceil(
            getProduct.count / parseInt(paginate(req.query).limit)
          ),
          query: req.query,
          ...getUom,
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
  async createUom(req, res) {
    const { uom_name, uom_identifier, descriptions } = req.body;
    const t = await sequelize.transaction();
    const decodeToken = decodeTokenOwner(req);
    try {
      const createUom = await uom.create(
        {
          uuid: uuidv4(),
          uom_name,
          uom_identifier,
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
        data: createUom,
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

module.exports = new uomcontroller();
