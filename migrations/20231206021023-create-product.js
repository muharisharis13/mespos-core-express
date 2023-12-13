"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
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
      outletId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Outlets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Owners",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("on_sale", "hidden"),
        defaultValue: "hidden",
        validate: {
          isIn: [["on_sale", "hidden"]],
        },
      },
      sku: {
        type: Sequelize.TEXT,
      },
      descriptions: {
        type: Sequelize.TEXT,
      },
      on_expired: {
        type: Sequelize.DATE,
      },
      is_searchable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("products");
  },
};
