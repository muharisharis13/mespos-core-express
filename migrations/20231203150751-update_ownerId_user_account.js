"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("User_accounts", "ownerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "owners", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    });
    await queryInterface.changeColumn("User_accounts", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("User_accounts", "ownerId");
    await queryInterface.removeColumn("User_accounts", "roleId");
  },
};
