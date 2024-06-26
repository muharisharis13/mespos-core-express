"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_accounts", {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Owners", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL", // or 'CASCADE' or 'RESTRICT'
      },
      status: {
        type: Sequelize.ENUM("active", "non-active"),
        defaultValue: "active",
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Roles", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      },
      avatar: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("User_accounts");
  },
};
