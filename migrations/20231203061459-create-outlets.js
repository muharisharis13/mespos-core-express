"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Outlets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
        allowNull: false,
        unique: true,
      },
      ownerId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        references: {
          model: "Owners",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // or 'SET NULL' or 'RESTRICT'
      },
      outlet_name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Outlets");
  },
};
