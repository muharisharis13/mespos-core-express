const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const {
  validate,
  supplierFormValidation,
} = require("../../../middleware/forms");
const supplierController = require("../controller/supplier");

router.get(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  supplierController.getSupplierPagination
);
router.post(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  validate(supplierFormValidation),
  supplierController.createSupplier
);

module.exports = router;
