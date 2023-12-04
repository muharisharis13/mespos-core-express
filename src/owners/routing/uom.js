const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const {
  uomValidation,
  validate,
  uomValidationDetail,
} = require("../../../middleware/forms");
const uomController = require("../controller/uom");

router.post(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  validate(uomValidation),
  uomController.createUom
);
router.get("/", tokenMiddleware.isHaveTokenOwner, uomController.getUomPaginate);
router.put(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  validate(uomValidationDetail),
  uomController.updateUom
);
router.delete(
  "/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  uomController.deleteUom
);

module.exports = router;
