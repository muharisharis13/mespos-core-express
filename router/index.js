const routerUser = require("../src/user/routing");

const Router = (app) => {
  routerUser(app);
};

module.exports = Router;
