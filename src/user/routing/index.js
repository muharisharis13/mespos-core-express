const authentication = require("./authentication");
const profile = require("./profile");
const urlRouter = require("../../../utils/urlRouter");

const Routing = (app) => {
  app.use(urlRouter.pathRouterUser("authentication"), authentication);
  app.use(urlRouter.pathRouterUser("profile"), profile);
};

module.exports = Routing;
