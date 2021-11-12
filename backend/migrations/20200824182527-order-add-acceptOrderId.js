"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("order", "accept_order_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("order", "accept_order_id");
  },
};
