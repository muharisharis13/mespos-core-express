const authentication = require("./authentication");
const urlRouter = require("../../../utils/urlRouter");

const Routing = (app) => {
  app.use(urlRouter.pathRouterUser("authentication"), authentication);
};

module.exports = Routing;
