const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    data: "hello",
  });
});

module.exports = router;
