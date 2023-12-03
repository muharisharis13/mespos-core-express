"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("token_owners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: true,
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userAccountId: {
        type: Sequelize.INTEGER,
        references: { model: "user_accounts", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("token_owners");
  },
};
