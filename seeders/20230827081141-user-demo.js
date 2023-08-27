"use strict";
const { v4: uuid4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        uuid: uuid4(),
        fullname: "Muharis",
        birthdate: "1998-04-27",
        phoneNumber: "082239720318",
        password: "b603b9e5b0a511501e8e92547ccc6348", //muharis
        token: null,
        referral: null,
        height: "168",
        weight: "85",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
