const {
  validate,
  productFormValidation,
  productStatusValidation,
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
router.post(
  "/status/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  validate(productStatusValidation),
  productController.changeStatusProduct
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
router.delete(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  productController.deleteProduct
);

module.exports = router;
