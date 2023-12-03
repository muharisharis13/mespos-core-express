const express = require("express");
const app = express();
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const middleware = require("./middleware");
const router = require("./router");

middleware({ app });

router(app);

app.listen(port, () => {
  console.log(`server sudah jalan di port ${port} ${NODE_ENV}`);
});
