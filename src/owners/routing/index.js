const pathRouter = require("../../../utils/urlRouter");
const routingAuthentication = require("./authentication");
const routingCategory = require("./category");

const Routing = (app) => {
  app.use("/api/v1/owner/auth", routingAuthentication);
  app.use("/api/v1/owner/category", routingCategory);
};

module.exports = Routing;
