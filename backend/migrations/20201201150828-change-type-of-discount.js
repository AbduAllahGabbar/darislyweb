"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.changeColumn("order", "discount", {
      type: Sequelize.FLOAT,
      allowNull: false,
      default: 0.0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.changeColumn("order", "discount", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: 0,
    });
  },
};
