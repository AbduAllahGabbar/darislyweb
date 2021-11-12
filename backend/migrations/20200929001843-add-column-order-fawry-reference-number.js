"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (!tableDefinition["fawry_reference_number"]) {
            return queryInterface.addColumn("order", "fawry_reference_number", {
              type: Sequelize.STRING(50),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.changeColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["accept_order_id"]) {
            return queryInterface.removeColumn("order", "accept_order_id");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["verified"]) {
            return queryInterface.removeColumn("order", "verified");
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
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["fawry_reference_number"]) {
            return queryInterface.removeColumn(
              "order",
              "fawry_reference_number"
            );
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.changeColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return queryInterface.addColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["accept_order_id"]) {
            return Promise.resolve(true);
          } else {
            return queryInterface.addColumn("order", "accept_order_id", {
              type: Sequelize.INTEGER(10).UNSIGNED,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["verified"]) {
            return Promise.resolve(true);
          } else {
            return queryInterface.addColumn("order", "verified", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: 0,
            });
          }
        }),
      ]);
    });
  },
};
