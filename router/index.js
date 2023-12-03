const routerOwners = require("../src/owners/routing");

const Router = (app) => {
  routerOwners(app);
};

module.exports = Router;
