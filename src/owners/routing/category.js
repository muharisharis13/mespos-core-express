const { validate, categoryValidator } = require("../../../middleware/forms");
const categoryController = require("../controller/category");
const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");

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

module.exports = router;
