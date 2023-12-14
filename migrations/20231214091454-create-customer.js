"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Owners",
          key: "id",
        },
        allowNull: true,
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      userAccountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User_accounts",
          key: "id",
        },
        allowNull: true,
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("customers");
  },
};
