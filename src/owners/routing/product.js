const {
  validate,
  productFormValidation,
} = require("../../../middleware/forms");
const productController = require("../controller/product");
const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");

router.post(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  validate(productFormValidation),
  productController.createProduct
);
router.get(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  productController.getPaginateProduct
);
router.get(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  productController.getDetailProduct
);

module.exports = router;
