"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      procrumentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "procruments",
          key: "id",
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userAccountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "User_accounts",
          key: "id",
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      initial_stock: {
        type: Sequelize.INTEGER,
      },
      new_stock: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "id",
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      operation_type: {
        type: Sequelize.ENUM(
          "sold",
          "deleted",
          "stocked",
          "void_return",
          "stock_return",
          "added",
          "lost"
        ),
      },
      sellingUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "selling_units",
          key: "id",
        },
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
    await queryInterface.dropTable("product_histories");
  },
};
