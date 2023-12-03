const {
  validate,
  registerValidator,
  loginValidator,
} = require("../../../middleware/forms");
const authentication = require("../controller/authentication");
const express = require("express");
const router = express.Router();

router.post("/register", validate(registerValidator), authentication.register);
router.post("/login", validate(loginValidator), authentication.login);

module.exports = router;
