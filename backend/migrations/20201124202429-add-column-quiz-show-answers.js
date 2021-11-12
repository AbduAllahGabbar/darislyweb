"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable("quiz").then((tableDefinition) => {
      if (!tableDefinition["show_answers"]) {
        return queryInterface.addColumn("quiz", "show_answers", {
          type: Sequelize.TINYINT(4),
          allowNull: false,
          defaultValue: 1,
        });
      } else {
        return Promise.resolve(true);
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.describeTable("quiz").then((tableDefinition) => {
      if (tableDefinition["show_answers"]) {
        return queryInterface.removeColumn("quiz", "show_answers");
      } else {
        return Promise.resolve(true);
      }
    });
  },
};
