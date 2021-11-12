"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (!tableDefinition["email_verified"]) {
            return queryInterface.addColumn("student", "email_verified", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (!tableDefinition["phone_verified"]) {
            return queryInterface.addColumn("student", "phone_verified", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["first_name"]) {
            return queryInterface.changeColumn("student", "first_name", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "first_name", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["last_name"]) {
            return queryInterface.changeColumn("student", "last_name", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "last_name", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["country_code"]) {
            return queryInterface.changeColumn("student", "country_code", {
              type: Sequelize.STRING(10),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "country_code", {
              type: Sequelize.STRING(10),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["country"]) {
            return queryInterface.changeColumn("student", "country", {
              type: Sequelize.INTEGER(3),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "country", {
              type: Sequelize.INTEGER(3),
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
          if (tableDefinition["email_verified"]) {
            return queryInterface.removeColumn("student", "email_verified");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["phone_verified"]) {
            return queryInterface.removeColumn("student", "phone_verified");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["first_name"]) {
            return queryInterface.changeColumn("student", "first_name", {
              type: Sequelize.STRING(20),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("student", "first_name", {
              type: Sequelize.STRING(20),
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["last_name"]) {
            return queryInterface.changeColumn("student", "last_name", {
              type: Sequelize.STRING(20),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("student", "last_name", {
              type: Sequelize.STRING(20),
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["country"]) {
            return queryInterface.changeColumn("student", "country", {
              type: Sequelize.INTEGER(3),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("student", "country", {
              type: Sequelize.INTEGER(3),
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["country_code"]) {
            return queryInterface.changeColumn("student", "country_code", {
              type: Sequelize.STRING(10),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("student", "country_code", {
              type: Sequelize.STRING(10),
              allowNull: false,
            });
          }
        }),
      ]);
    });
  },
};
