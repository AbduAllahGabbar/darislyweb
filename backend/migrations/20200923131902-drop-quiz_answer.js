"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("quiz_answer");
  },

  down: async (queryInterface, Sequelize) => {},
};
