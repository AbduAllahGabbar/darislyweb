"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.changeColumn(
              "student",
              "reset_password_token",
              {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn("student", "reset_password_token", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.changeColumn(
              "student",
              "reset_password_expires",
              {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn(
              "student",
              "reset_password_expires",
              {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
              }
            );
          }
        }),

        queryInterface.describeTable("tutor").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.changeColumn(
              "tutor",
              "reset_password_token",
              {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn("tutor", "reset_password_token", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("tutor").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.changeColumn(
              "tutor",
              "reset_password_expires",
              {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn("tutor", "reset_password_expires", {
              type: Sequelize.DATE,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),

        queryInterface.describeTable("staff").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.changeColumn(
              "staff",
              "reset_password_token",
              {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn("staff", "reset_password_token", {
              type: Sequelize.STRING(20),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("staff").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.changeColumn(
              "staff",
              "reset_password_expires",
              {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn("staff", "reset_password_expires", {
              type: Sequelize.DATE,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.removeColumn(
              "student",
              "reset_password_token"
            );
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.removeColumn(
              "student",
              "reset_password_expires"
            );
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("tutor").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.removeColumn("tutor", "reset_password_token");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("tutor").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.removeColumn(
              "tutor",
              "reset_password_expires"
            );
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("staff").then((tableDefinition) => {
          if (tableDefinition["reset_password_token"]) {
            return queryInterface.removeColumn("staff", "reset_password_token");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("staff").then((tableDefinition) => {
          if (tableDefinition["reset_password_expires"]) {
            return queryInterface.removeColumn(
              "staff",
              "reset_password_expires"
            );
          } else {
            return Promise.resolve(true);
          }
        }),
      ]);
    });
  },
};
