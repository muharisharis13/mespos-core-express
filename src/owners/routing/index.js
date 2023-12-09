const pathRouter = require("../../../utils/urlRouter");
const routingAuthentication = require("./authentication");
const routingCategory = require("./category");
const routingUom = require("./uom");
const routingProduct = require("./product");

const Routing = (app) => {
  app.use("/api/v1/owner/auth", routingAuthentication);
  app.use("/api/v1/owner/category", routingCategory);
  app.use("/api/v1/owner/uom", routingUom);
  app.use("/api/v1/owner/product", routingProduct);
};

module.exports = Routing;
