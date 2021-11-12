"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (!tableDefinition["meeting_url"]) {
            return queryInterface.addColumn("live_session", "meeting_url", {
              type: "VARBINARY(255)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (tableDefinition["meeting_id"]) {
            return queryInterface.changeColumn("live_session", "meeting_id", {
              type: "VARBINARY(60)",
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("live_session", "meeting_id", {
              type: "VARBINARY(60)",
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (tableDefinition["meeting_password"]) {
            return queryInterface.changeColumn(
              "live_session",
              "meeting_password",
              {
                type: "VARBINARY(60)",
                allowNull: true,
                defaultValue: null,
              }
            );
          } else {
            return queryInterface.addColumn(
              "live_session",
              "meeting_password",
              {
                type: "VARBINARY(60)",
                allowNull: true,
                defaultValue: null,
              }
            );
          }
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (tableDefinition["meeting_url"]) {
            return queryInterface.removeColumn("live_session", "meeting_url");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (tableDefinition["meeting_id"]) {
            return queryInterface.changeColumn("live_session", "meeting_id", {
              type: "VARBINARY(60)",
              allowNull: false,
            });
          } else {
            return queryInterface.addColumn("live_session", "meeting_id", {
              type: "VARBINARY(60)",
              allowNull: false,
            });
          }
        }),
        queryInterface.describeTable("live_session").then((tableDefinition) => {
          if (tableDefinition["meeting_password"]) {
            return queryInterface.changeColumn(
              "live_session",
              "meeting_password",
              {
                type: "VARBINARY(60)",
                allowNull: false,
              }
            );
          } else {
            return queryInterface.addColumn(
              "live_session",
              "meeting_password",
              {
                type: "VARBINARY(60)",
                allowNull: false,
              }
            );
          }
        }),
      ]);
    });
  },
};
