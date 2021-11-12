"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("quiz", "duration", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("quiz", "duration", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
