"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("order_item").then((tableDefinition) => {
          if (!tableDefinition["type"]) {
            return queryInterface.addColumn("order_item", "type", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("attendance").then((tableDefinition) => {
          if (!tableDefinition["type"]) {
            return queryInterface.addColumn("attendance", "type", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("order_item").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.removeColumn("order_item", "type");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("attendance").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.removeColumn("attendance", "type");
          } else {
            return Promise.resolve(true);
          }
        }),
      ]);
    });
  },
};
