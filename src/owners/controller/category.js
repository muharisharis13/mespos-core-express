const { categories, sequelize, product } = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
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

class categoriesClass {
  async changeDisplay(req, res) {
    const { uuid } = req.params;
    const { display } = req.body;

    const t = await sequelize.transaction();
    try {
      const updateDisplayCategory = await categories.update(
        {
          display,
        },
        {
          where: {
            uuid,
          },
        },
        {
          transaction: t,
        }
      );

      t.commit();

      return responseJSON({
        res,
        data: updateDisplayCategory,
        status: 200,
      });
    } catch (error) {
      t.rollback();
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
  async getDetailCategories(req, res) {
    const { uuid } = req.params;

    try {
      const decodeToken = decodeTokenOwner(req);
      const getCategory = await categories.findOne({
        where: {
          ownerId: decodeToken?.ownerId,
          uuid,
        },
      });

      if (!getCategory) {
        return responseJSON({
          res,
          data: "Categories does not exists",
          status: 400,
        });
      }

      return responseJSON({
        res,
        data: getCategory,
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
  async deleteCategories(req, res) {
    const { uuid } = req.params;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getCategory = await categories.findOne({
        where: {
          ownerId: decodeToken?.ownerId,
          uuid,
        },
      });

      if (!getCategory) {
        return responseJSON({
          res,
          data: "Categories does not exists",
          status: 400,
        });
      }

      await getCategory.destroy();

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
  async updateCategories(req, res) {
    const { uuid } = req.params;
    const { category_name, category_identifier, descriptions, display } =
      req.body;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getCategory = await categories.findOne({
        where: {
          ownerId: decodeToken?.ownerId,
          uuid,
        },
      });

      if (!getCategory) {
        return responseJSON({
          res,
          data: "Categories does not exists",
          status: 400,
        });
      }

      const updateCategory = await getCategory.update({
        category_name,
        category_identifier,
        descriptions,
        display,
      });

      return responseJSON({
        res,
        data: updateCategory,
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
  async getCategory(req, res) {
    const { page = 1, limit = 1 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      const category = await categories.findAndCountAll({
        limit: parseInt(limit),
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        where: {
          ownerId: decodeToken?.ownerId,
          ...filterQuery(req.query),
        },
        include: {
          all: true,
          nested: true,
          attributes: {
            exclude: ["id", "selling_units"],
          },
        },
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: limit,
          totalPages: Math.ceil(category.count / parseInt(limit)),
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
    const { category_name, category_identifier, descriptions, display } =
      req.body;
    const t = await sequelize.transaction();
    const decodeToken = decodeTokenOwner(req);
    try {
      const category = await categories.create(
        {
          uuid: uuidv4(),
          category_name,
          category_identifier,
          descriptions,
          ownerId: decodeToken?.ownerId,
          display,
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
