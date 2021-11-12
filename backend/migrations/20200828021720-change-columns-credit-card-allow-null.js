"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("credit_card").then((tableDefinition) => {
          if (tableDefinition["card_token"]) {
            return queryInterface.changeColumn("credit_card", "card_token", {
              type: Sequelize.STRING(200),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("credit_card", "card_token", {
              type: Sequelize.STRING(200),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("credit_card").then((tableDefinition) => {
          if (tableDefinition["card_password"]) {
            return queryInterface.changeColumn("credit_card", "card_password", {
              type: Sequelize.STRING(200),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("credit_card", "card_password", {
              type: Sequelize.STRING(200),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("credit_card").then((tableDefinition) => {
          if (tableDefinition["subtype"]) {
            return queryInterface.changeColumn("credit_card", "subtype", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("credit_card", "subtype", {
              type: "TINYINT(4)",
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("credit_card").then((tableDefinition) => {
          if (tableDefinition["masked_pan"]) {
            return queryInterface.changeColumn("credit_card", "masked_pan", {
              type: "CHAR(4)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("credit_card", "masked_pan", {
              type: "CHAR(4)",
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve(true);
  },
};
