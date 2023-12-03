// const express = require("express");
// const router = express.Router();
const authentication = require("../controller/authentication");

const RouterAuthentication = (Route) => {
  return {
    register: Route.post("/register", authentication.register),
  };
};

module.exports = RouterAuthentication;
