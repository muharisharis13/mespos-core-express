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
class productController {
  async deleteProduct(req, res) {
    const { uuid } = req.params;

    try {
      const getSellingUnit = await selling_unit.destroy({
        where: {
          productId: uuid,
        },
      });
      const deleteProduct = await product.destroy({
        where: {
          id: uuid,
        },
      });

      if (!deleteProduct) {
        return responseJSON({
          res,
          data: "Product Not Found",
          status: 400,
        });
      }
      return responseJSON({
        res,
        data: { deleteProduct, getSellingUnit },
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
  async changeStatusProduct(req, res) {
    const { uuid } = req.params;
    const { status } = req.body;

    try {
      const getDetailProduct = await product.findOne({
        where: {
          uuid,
        },
      });

      if (!getDetailProduct) {
        return responseJSON({
          res,
          data: "Product Not Found",
          status: 400,
        });
      }
      const updateProduct = await getDetailProduct.update({
        status: status,
      });

      return responseJSON({
        res,
        data: updateProduct,
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
  async getDetailProduct(req, res) {
    const { uuid } = req.params;

    try {
      const decodeToken = decodeTokenOwner(req);
      const getDetailSellingUnit = await product.findOne({
        where: {
          uuid,
          ["$product.ownerId$"]: decodeToken?.ownerId,
        },
        include: {
          all: true,
          nested: true,
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
    const { page = 1, limit = 10 } = req.query;

    try {
      const decodeToken = decodeTokenOwner(req);
      let getProduct = await product.findAndCountAll({
        limit: parseInt(limit),
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        where: {
          ["$product.ownerId$"]: decodeToken?.ownerId,
          ...filterQuery(req.query),
        },
        include: {
          all: true,
          nested: true,
        },
        // include: [selling_unit, Owners, Outlets, categories],
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: limit,
          totalPages: Math.ceil(parseInt(getProduct.count) / parseInt(limit)),
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

  async updateProduct(req, res) {
    const { uuid } = req.params;
    const {
      outletId,
      product_name,
      categoryId,
      status,
      sku,
      descriptions,
      on_expired,
      is_searchable,
      selling_units,
    } = req.body;

    const t = await sequelize.transaction();
    try {
      const decodeToken = decodeTokenOwner(req);
      if (!Array.isArray(selling_units)) {
        return responseJSON({
          res,
          data: "selling_units must be array",
          status: 400,
        });
      }

      const findOneProduct = await product.findOne({
        where: {
          uuid,
          ownerId: decodeToken?.ownerId,
        },
      });

      if (!findOneProduct) {
        return responseJSON({
          res,
          data: "Product NOt Found",
          status: 400,
        });
      }

      const updateProduct = await product.update(
        {
          product_name,
          outletId,
          categoryId,
          status,
          sku,
          descriptions,
          on_expired,
          is_searchable,
        },
        {
          where: {
            uuid,
            ownerId: decodeToken?.ownerId,
          },
        },
        {
          transaction: t,
        }
      );

      let updateSellingUnit;

      for (let i = 0; i < selling_units.length; i++) {
        if (!selling_units[i].uuid) {
          updateSellingUnit = await selling_unit.create(
            {
              uuid: uuidv4(),
              productId: findOneProduct.id,
              selling_price: selling_units[i].selling_price,
              price: selling_units[i].price,
              whosale_price: selling_units[i].whosale_price,
              uomId: selling_units[i].uomId,
              stock: selling_units[i].stock,
              min_stock: selling_units[i].min_stock,
              is_enabled_min_stock: selling_units[i].is_enabled_min_stock,
            },
            {
              transaction: t,
            }
          );
        } else {
          updateSellingUnit = await selling_unit.update(
            {
              selling_price: selling_units[i].selling_price,
              price: selling_units[i].price,
              whosale_price: selling_units[i].whosale_price,
              uomId: selling_units[i].uomId,
              stock: selling_units[i].stock,
              min_stock: selling_units[i].min_stock,
              is_enabled_min_stock: selling_units[i].is_enabled_min_stock,
            },
            {
              where: {
                productId: findOneProduct.id,
                uuid: selling_units[i].uuid,
              },
            },
            {
              transaction: t,
            }
          );
        }
      }

      await t.commit();

      return responseJSON({
        res,
        data: {
          product: updateProduct,
          selling_unit: updateSellingUnit,
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

      selling_units,
    } = req.body;
    const t = await sequelize.transaction();

    try {
      const decodeToken = decodeTokenOwner(req);
      if (!Array.isArray(selling_units)) {
        return responseJSON({
          res,
          data: "selling_units must be array",
          status: 400,
        });
      }
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

      for (let i = 0; i < selling_units.length; i++) {
        await selling_unit.create(
          {
            uuid: uuidv4(),
            productId: createProduct.id,
            selling_price: selling_units[i].selling_price,
            price: selling_units[i].price,
            whosale_price: selling_units[i].whosale_price,
            uomId: selling_units[i].uomId,
            stock: selling_units[i].stock,
            min_stock: selling_units[i].min_stock,
            is_enabled_min_stock: selling_units[i].is_enabled_min_stock,
          },
          {
            transaction: t,
          }
        );
      }

      const getSellingUnits = await selling_unit.findAll({
        where: {
          productId: createProduct.id,
        },
      });

      await t.commit();

      return responseJSON({
        res,
        data: {
          product: createProduct,
          selling_unit: getSellingUnits,
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

module.exports = new productController();
