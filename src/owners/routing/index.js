const pathRouter = require("../../../utils/urlRouter");
const routingAuthentication = require("./authentication");
const routingCategory = require("./category");
const routingUom = require("./uom");
const routingProduct = require("./product");
const routingSupplier = require("./supplier");
const routingOutlet = require("./outltet");

const Routing = (app) => {
  app.use("/api/v1/owner/auth", routingAuthentication);
  app.use("/api/v1/owner/category", routingCategory);
  app.use("/api/v1/owner/uom", routingUom);
  app.use("/api/v1/owner/product", routingProduct);
  app.use("/api/v1/owner/supplier", routingSupplier);
  app.use("/api/v1/owner/outlet", routingOutlet);
};

module.exports = Routing;
