const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../../../middleware/token");
const outletController = require("../controller/outlet");

router.get("/", tokenMiddleware.isHaveTokenOwner, outletController.getOutlet);

module.exports = router;
