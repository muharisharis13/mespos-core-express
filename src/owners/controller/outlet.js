const { Outlets, sequelize } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");
const { Op } = require("sequelize");

const paginate = (query) => {
  let page = query.page ? parseInt(query.page) - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = parseInt(page) * parseInt(limit);

  return {
    offset,
    limit,
  };
};

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

class outlesController {
  async getOutlet(req, res) {
    const { page = 1, limit = 1 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      const outlets = await Outlets.findAndCountAll({
        limit: parseInt(limit),
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["RoleId", "OwnerId"],
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
          limit: limit,
          totalPages: Math.ceil(outlets.count / parseInt(limit)),
          query: req.query,
          ...outlets,
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
}

module.exports = new outlesController();
