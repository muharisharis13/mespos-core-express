const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const stockController = require("../controller/stock");
const { validate, formStockValidation } = require("../../../middleware/forms");
const sellingUnitMiddlerware = require("../../../middleware/modules/selling_units");

router.post(
  "/adjustment",
  tokenMiddleware.isHaveTokenOwner,
  stockController.createStockAdjustment
);
router.get(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  stockController.getStockRecord
);

module.exports = router;
