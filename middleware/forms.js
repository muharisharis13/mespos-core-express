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

exports.productFormValidation = [
  body("outletId", "outletId is required").not().isEmpty(),
  body("product_name", "product_name is required").not().isEmpty(),
  body("categoryId", "categoryId is required").not().isEmpty(),
  body("uomId", "uomId is required").not().isEmpty(),
];

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
