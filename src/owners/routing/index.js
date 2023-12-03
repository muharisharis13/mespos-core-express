const pathRouter = require("../../../utils/urlRouter");
const routingAuthentication = require("./authentication");
const Route = require("express-route-group");

const Routing = (app) => {
  app.use(
    "/api/v1/owner/auth",
    Route.routes([routingAuthentication(Route).register])
  );
};

module.exports = Routing;
