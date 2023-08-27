const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const profile = require("../controller/profile");

router.get("/", middleware.isHaveToken, profile.profile);

module.exports = router;
