"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable("order").then((tableDefinition) => {
      if (!tableDefinition["status"]) {
        return queryInterface.addColumn("order", "status", {
          type: "TINYINT(4)",
          allowNull: false,
          defaultValue: 0,
        });
      } else {
        return Promise.resolve(true);
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.describeTable("order").then((tableDefinition) => {
      if (tableDefinition["status"]) {
        return queryInterface.removeColumn("order", "status");
      } else {
        return Promise.resolve(true);
      }
    });
  },
};
