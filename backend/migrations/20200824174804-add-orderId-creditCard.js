"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("credit_card", "order_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("credit_card", "order_id");
  },
};
