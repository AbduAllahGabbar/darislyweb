"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("section").then((tableDefinition) => {
          if (tableDefinition["title"]) {
            return queryInterface.changeColumn("section", "title", {
              type: Sequelize.STRING(200),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("section", "title", {
              type: Sequelize.STRING(200),
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("lecture").then((tableDefinition) => {
          if (tableDefinition["title"]) {
            return queryInterface.changeColumn("lecture", "title", {
              type: Sequelize.STRING(200),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("lecture", "title", {
              type: Sequelize.STRING(200),
              allowNull: false,
            });
          }
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("section").then((tableDefinition) => {
          if (tableDefinition["title"]) {
            return queryInterface.changeColumn("section", "title", {
              type: Sequelize.STRING(50),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("section", "title", {
              type: Sequelize.STRING(50),
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("lecture").then((tableDefinition) => {
          if (tableDefinition["title"]) {
            return queryInterface.changeColumn("lecture", "title", {
              type: Sequelize.STRING(50),
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("lecture", "title", {
              type: Sequelize.STRING(50),
              allowNull: false,
            });
          }
        }),
      ]);
    });
  },
};
