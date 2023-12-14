"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
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
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      payment_status: {
        type: Sequelize.ENUM(
          "paid",
          "partially_paid",
          "voided",
          "hold",
          "partially_refund"
        ),
      },
      total_discount: {
        type: Sequelize.INTEGER,
      },
      total_order: {
        type: Sequelize.INTEGER,
      },
      total_refund: {
        type: Sequelize.INTEGER,
      },
      order_type: {
        type: Sequelize.ENUM("take_away", "dine_in"),
      },
      cashierId: {
        type: Sequelize.INTEGER,
      },
      type_discount: {
        type: Sequelize.ENUM("flat", "percentage"),
      },
      order_number: {
        type: Sequelize.STRING,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Owners",
          key: "id",
        },
        allowNull: true,
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
    await queryInterface.dropTable("orders");
  },
};
