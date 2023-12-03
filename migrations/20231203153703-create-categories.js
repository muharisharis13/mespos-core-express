"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
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
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_identifier: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      display: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      descriptions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "owners",
          key: "id",
        },
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
    await queryInterface.dropTable("categories");
  },
};