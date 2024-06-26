const { body, validationResult, param } = require("express-validator");

exports.registerValidator = [
  body("fullname", "fullname is required").not().isEmpty(),
  body("outlet_name", "outlet_name is required").not().isEmpty(),
  body("email", "email not valid").isEmail(),
  body("email", "email is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];
exports.loginValidator = [
  body("email", "email not valid").isEmail(),
  body("email", "email is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

exports.categoryValidator = [
  body("category_name", "category_name is required").not().isEmpty(),
  body("category_identifier", "category_identifier is required")
    .not()
    .isEmpty(),
];

exports.categoryValidatorDetail = [
  body("category_name", "category_name is required").not().isEmpty(),
  body("category_identifier", "category_identifier is required")
    .not()
    .isEmpty(),
  param("uuid", "uuid is required").not().isEmpty(),
];

exports.uomValidation = [
  body("uom_name", "uom_name is required").not().isEmpty(),
  body("uom_identifier", "uom_identifier is required").not().isEmpty(),
];
exports.uomValidationDetail = [
  body("uom_name", "uom_name is required").not().isEmpty(),
  body("uom_identifier", "uom_identifier is required").not().isEmpty(),
  param("uuid", "uuid is required").not().isEmpty(),
];

exports.productStatusValidation = [
  body("status", "status is required").not().isEmpty(),
];

exports.productFormValidation = [
  body("outletId", "outletId is required").not().isEmpty(),
  body("product_name", "product_name is required").not().isEmpty(),
  body("categoryId", "categoryId is required").not().isEmpty(),
  body("selling_units", "selling_units is required").not().isEmpty(),
];
exports.supplierFormValidation = [
  body("supplier_name", "supplier_name is required").not().isEmpty(),
  body("phone", "phone is required").not().isEmpty(),
  body("address_1", "address_1 is required").not().isEmpty(),
];

exports.formStockValidation = [
  body("price", "price is required").not().isEmpty(),
  body("operation_type", "operation_type is required").not().isEmpty(),
  body("sellingUnitId", "sellingUnitId is required").not().isEmpty(),
  body("qty", "qty is required").not().isEmpty(),
  body("initial_qty", "initial_qty is required").not().isEmpty(),
];

exports.formPaymentValidation = {
  payment_name: body("payment_name", "payment_name is required")
    .not()
    .isEmpty(),
  display: body("display", "display is required").not().isEmpty(),
};

exports.validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};
