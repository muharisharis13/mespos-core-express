const { product_histories, sequelize } = require("../../../models");
const { v4: uuidv4 } = require("uuid");
const responseJSON = require("../../../utils/responseJSON");
const { decodeTokenOwner } = require("../../../utils/token/decodeToken");

class stockController {
  async createStockAdjustment(req, res) {
    const { initial_qty, qty, sellingUnitId, operation_type, price } = req.body;
    try {
      if (["add", "deleted", "lost"].includes(operation_type)) {
        const createProductHistories = await product_histories.create({
          initial_qty,
          qty,
          new_qty: parseInt(initial_qty) + parseInt(qty),
          sellingUnitId,
          price,
        });
      } else {
        return responseJSON({
          res,
          data: "Invalid Operation Type",
          status: 400,
        });
      }
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

module.exports = new stockController();
