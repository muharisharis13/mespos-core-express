const bodyParser = require("body-parser");
const cors = require("cors");

const Middleware = ({ app }) => {
  app.use(cors());

  app.options("*", cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

module.exports = Middleware;
