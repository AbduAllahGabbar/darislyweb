"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["email"]) {
            return queryInterface.changeColumn("student", "email", {
              type: Sequelize.STRING(50),
              unique: true,
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "email", {
              type: Sequelize.STRING(50),
              unique: true,
              allowNull: true,
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
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["password"]) {
            return queryInterface.changeColumn("student", "password", {
              type: "BINARY(60)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "password", {
              type: "BINARY(60)",
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["email"]) {
            return queryInterface.changeColumn("student", "email", {
              type: Sequelize.STRING(50),
              allowNull: false,
              unique: true,
            });
          } else {
            return queryInterface.addColumn("student", "email", {
              type: Sequelize.STRING(50),
              allowNull: false,
              unique: true,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["phone"]) {
            return queryInterface.changeColumn("student", "phone", {
              type: Sequelize.STRING(15),
              allowNull: false,
              unique: true,
            });
          } else {
            return queryInterface.addColumn("student", "phone", {
              type: Sequelize.STRING(15),
              allowNull: false,
              unique: true,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["password"]) {
            return queryInterface.changeColumn("student", "password", {
              type: "BINARY(60)",
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("student", "password", {
              type: "BINARY(60)",
              allowNull: false,
            });
          }
        }),
      ]);
    });
  },
};
