"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "quiz_answer",
      "correct_count",
      Sequelize.INTEGER(10)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("quiz_answer", "correct_count");
  },
};
