const { selling_unit } = require("../../models");
const responseJSON = require("../../utils/responseJSON");

class stockService {
  async ishaveSellingUnit(req, res, next) {
    try {
      const arrBody = req.body;

      if (!Array.isArray(arrBody)) {
        throw new Error("Body must be an array");
      }

      // Use Promise.all to wait for all promises to resolve
      await Promise.all(
        arrBody.map(async (item) => {
          const response = await selling_unit.findOne({
            where: {
              id: item.sellingUnitId,
            },
          });

          if (!response) {
            throw new Error("selling_unit Not Found");
          }
        })
      );

      // If all promises resolve, call next
      next();
    } catch (error) {
      // Handle errors if any of the promises reject
      return responseJSON({
        res,
        data: error.message,
        status: 500,
      });
    }
  }
}

module.exports = new stockService();
