const {
  product_histories,
  selling_unit,
  sequelize,
} = require("../../../models");
const { v4: uuidv4 } = require("uuid");
const responseJSON = require("../../../utils/responseJSON");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");
const { paginate } = require("../../../utils/pagination");
const { Op } = require("sequelize");

const calculateNewQty = (initial_qty, qty, type) => {
  switch (type) {
    case "added":
      return parseInt(initial_qty) + parseInt(qty);
    case "deleted":
      return parseInt(initial_qty) - parseInt(qty);
    case "lost":
      return parseInt(initial_qty) - parseInt(qty);
  }
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

class stockController {
  async getStockRecord(req, res) {
    const { page = 1, limit = 1 } = req.query;
    try {
      const decodeToken = decodeTokenOwner(req);
      const getProductHistories = await product_histories.findAndCountAll({
        limit: parseInt(limit),
        offset: paginate(req.query).offset,
        order: [["id", "DESC"]],
        include: {
          all: true,
          nested: true,
        },
        where: {
          userAccountId: decodeToken?.id,
          ...filterQuery(req.query),
        },
      });

      return responseJSON({
        res,
        data: {
          page: parseInt(page),
          limit: limit,
          totalPages: Math.ceil(getProductHistories.count / parseInt(limit)),
          query: req.query,
          ...getProductHistories,
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
  async createStockAdjustment(req, res) {
    const arrBody = req.body;
    const t = await sequelize.transaction();

    try {
      const decodeToken = decodeTokenOwner(req);

      let createProductHistories = [];
      let updateSellingUnit = [];

      for (const item of arrBody) {
        const productHistory = await product_histories.create(
          {
            price: item.price,
            uuid: uuidv4(),
            initial_stock: item.initial_qty,
            qty: item.qty,
            new_stock: calculateNewQty(
              item.initial_qty,
              item.qty,
              item.operation_type
            ),
            sellingUnitId: item.sellingUnitId,
            userAccountId: decodeToken.id,
            operation_type: item.operation_type,
          },
          {
            transaction: t,
          }
        );

        createProductHistories.push(productHistory);

        const getSellingUnit = await selling_unit.findOne({
          where: {
            id: item.sellingUnitId,
          },
        });

        if (!getSellingUnit) {
          await t.rollback(); // Rollback the transaction if selling unit is not found
          return responseJSON({
            res,
            data: "Selling unit not found",
            status: 400,
          });
        }

        const newStock = await calculateNewQty(
          item.initial_qty,
          item.qty,
          item.operation_type
        );

        await getSellingUnit.update(
          {
            stock: newStock,
          },
          {
            transaction: t,
          }
        );

        updateSellingUnit.push(getSellingUnit);
      }

      await t.commit();

      return await responseJSON({
        res,
        data: {
          message: "Successfully created",
          createProductHistories,
          updateSellingUnit,
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

module.exports = new stockController();
