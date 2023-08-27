class urlRouter {
  pathRouterUser = (nameRouter) => `/api/v1/user/${nameRouter}`;
}

module.exports = new urlRouter();
