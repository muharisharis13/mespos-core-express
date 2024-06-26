"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("token_owners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userAccountId: {
        type: Sequelize.INTEGER,
        references: { model: "User_accounts", key: "id" },

        onUpdate: "SET NULL",
        onDelete: "SET NULL", // or 'CASCADE' or 'RESTRICT'
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
