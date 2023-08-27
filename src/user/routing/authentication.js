const express = require("express");
const router = express.Router();
const authentication = require("../controller/authentication");
const middleware = require("../middleware");

router.post(
  "/token/refresh",
  middleware.validate().formRefreshToken,
  authentication.tokenRefresh
);
router.post("/register", authentication.register);
router.post(
  "/login",
  middleware.checkFormAuthentication,
  middleware.findUser,
  authentication.login
);

module.exports = router;
