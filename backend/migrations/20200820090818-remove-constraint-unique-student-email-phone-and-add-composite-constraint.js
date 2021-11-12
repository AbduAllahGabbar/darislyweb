"use strict";

const { countryCode } = require("../utils/errors");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint("student", "email"),
        queryInterface.removeConstraint("student", "phone"),
        queryInterface.addConstraint("student", {
          fields: ["email", "phone", "country_code"],
          type: "unique",
          name: "email_phone_country_code_unique",
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["email"]) {
            return queryInterface.changeColumn("student", "email", {
              type: Sequelize.STRING(50),
              allowNull: true,
              unique: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "email", {
              type: Sequelize.STRING(50),
              allowNull: true,
              unique: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["phone"]) {
            return queryInterface.changeColumn("student", "phone", {
              type: Sequelize.STRING(15),
              unique: true,
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "phone", {
              type: Sequelize.STRING(15),
              unique: true,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.removeConstraint("student", "email_phone_country_code_unique"),
      ]);
    });
  },
};
