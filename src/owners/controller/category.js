const { categories, sequelize } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");

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

class categoriesClass {
  async getCategory(req, res) {
    const { page = 1, pageSize = 1 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      const category = await categories.findAndCountAll({
        limit: paginate(req.query).limit,
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        where: {
          ownerId: decodeToken?.ownerId,
          ...req.query,
        },
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: paginate(req.query).limit,
          pageSize: parseInt(pageSize),
          query: req.query,
          ...category,
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
  async add(req, res) {
    const { category_name, category_identifier, descriptions, ownerId } =
      req.body;
    const t = await sequelize.transaction();
    try {
      const category = await categories.create(
        {
          uuid: uuidv4(),
          category_name,
          category_identifier,
          descriptions,
          ownerId,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return responseJSON({
        res,
        data: category,
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

module.exports = new categoriesClass();
