const pathRouter = require("../../../utils/urlRouter");
const routingAuthentication = require("./authentication");
const routingCategory = require("./category");
const routingUom = require("./uom");

const Routing = (app) => {
  app.use("/api/v1/owner/auth", routingAuthentication);
  app.use("/api/v1/owner/category", routingCategory);
  app.use("/api/v1/owner/uom", routingUom);
};

module.exports = Routing;
