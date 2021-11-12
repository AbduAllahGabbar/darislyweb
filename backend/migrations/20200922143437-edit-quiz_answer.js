"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("quiz_answer", "quiz_id");
    await queryInterface.addColumn("quiz_answer", "quiz_session_id", {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: "quiz_session",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
