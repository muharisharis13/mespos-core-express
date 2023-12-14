"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("procruments", {
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
      procrument_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      invoice_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      delivery_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      delivery_status: {
        type: Sequelize.ENUM("pending", "delivered"),
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
        references: {
          model: "Owners",
          key: "id",
        },
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
        references: {
          model: "suppliers",
          key: "id",
        },
      },
      payment_status: {
        type: Sequelize.ENUM("paid", "unpadi"),
        allowNull: false,
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
    await queryInterface.dropTable("procruments");
  },
};
