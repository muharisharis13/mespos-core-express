"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("selling_units", {
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
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      selling_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      whosale_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      uomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "uoms",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      min_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_enabled_min_stock: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("selling_units");
  },
};
