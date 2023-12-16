const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const {
  validate,
  formPaymentValidation,
} = require("../../../middleware/forms");
const paymentTypeController = require("../controller/payment");

router.post(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  validate([formPaymentValidation.payment_name]),
  paymentTypeController.createPayment
);
router.put(
  "/display/:uuid",
  tokenMiddleware.isHaveTokenOwner,
  validate([formPaymentValidation.display]),
  paymentTypeController.changeDisplayStatus
);
router.get(
  "/",
  tokenMiddleware.isHaveTokenOwner,
  paymentTypeController.getPaymentPaginate
);

module.exports = router;
