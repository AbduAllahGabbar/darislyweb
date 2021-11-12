"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["week_days"]) {
            return queryInterface.changeColumn("course_group", "week_days", {
              field: "week_days",
              type: "JSON",
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("course_group", "week_days", {
              field: "week_days",
              type: "JSON",
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["from"]) {
            return queryInterface.removeColumn("course_group", "from");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["to"]) {
            return queryInterface.removeColumn("course_group", "to");
          } else {
            return Promise.resolve(true);
          }
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["week_days"]) {
            return queryInterface.changeColumn("course_group", "week_days", {
              field: "week_days",
              allowNull: true,
              type: Sequelize.STRING(15),
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("course_group", "week_days", {
              field: "week_days",
              allowNull: true,
              type: Sequelize.STRING(15),
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["from"]) {
            return queryInterface.changeColumn("course_group", "from", {
              type: "TIME",
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("course_group", "from", {
              type: "TIME",
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["to"]) {
            return queryInterface.changeColumn("course_group", "to", {
              type: "TIME",
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("course_group", "to", {
              type: "TIME",
              allowNull: false,
            });
          }
        }),
      ]);
    });
  },
};
