const {
  product,
  selling_unit,
  sequelize,
  Owners,
  Outlets,
  categories,
} = require("../../../models");
const responseJSON = require("../../../utils/responseJSON");
const { v4: uuidv4 } = require("uuid");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
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
class productController {
  async updateDetailProduct(req, res) {
    const { uuid } = req.params;
    const {} = req.body;
  }
  async getDetailProduct(req, res) {
    const { uuid } = req.params;

    try {
      const decodeToken = decodeTokenOwner(req);
      const getDetailSellingUnit = await selling_unit.findOne({
        where: {
          uuid,
          ["$product.ownerId$"]: decodeToken?.ownerId,
        },
      });

      return responseJSON({
        res,
        data: getDetailSellingUnit,
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
  async getPaginateProduct(req, res) {
    const { page = 1, pageSize = 1 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      let getProduct = await product.findAndCountAll({
        limit: paginate(req.query).limit,
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        where: {
          // ["$product.ownerId$"]: decodeToken?.ownerId,
          ...filterQuery(req.query),
        },
        // include: [selling_unit, Owners, Outlets, categories],
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: paginate(req.query).limit,
          pageSize: parseInt(pageSize),
          query: req.query,
          ...getProduct,
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
  async createProduct(req, res) {
    const {
      outletId,
      product_name,
      categoryId,
      status,
      sku,
      descriptions,
      on_expired,
      is_searchable,
      selling_price,
      price,
      whosale_price,
      uomId,
      stock,
      min_stock,
      is_enabled_min_stock,
    } = req.body;
    const t = await sequelize.transaction();

    try {
      const decodeToken = decodeTokenOwner(req);
      const createProduct = await product.create(
        {
          uuid: uuidv4(),
          product_name,
          outletId,
          categoryId,
          status,
          sku,
          descriptions,
          on_expired,
          is_searchable,
          ownerId: decodeToken?.ownerId,
        },
        {
          transaction: t,
        }
      );

      const createSellingUnit = await selling_unit.create(
        {
          uuid: uuidv4(),
          productId: createProduct.id,
          selling_price,
          price,
          whosale_price,
          uomId,
          stock,
          min_stock,
          is_enabled_min_stock,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return responseJSON({
        res,
        data: {
          product: createProduct,
          selling_unit: createSellingUnit,
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

module.exports = new productController();
