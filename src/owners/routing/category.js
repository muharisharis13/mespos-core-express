const {
  validate,
  categoryValidator,
  categoryValidatorDetail,
} = require("../../../middleware/forms");
const categoryController = require("../controller/category");
const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const { body } = require("express-validator");

router.post(
  "/display/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  validate([body("display", "display is required").not().isEmpty()]),
  categoryController.changeDisplay
);
router.post(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  validate(categoryValidator),
  categoryController.add
);
router.get(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  categoryController.getCategory
);
router.put(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  validate(categoryValidatorDetail),
  categoryController.updateCategories
);
router.get(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  categoryController.getDetailCategories
);
router.delete(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  categoryController.deleteCategories
);

module.exports = router;
