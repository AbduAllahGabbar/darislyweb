"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("course").then((tableDefinition) => {
      if (!tableDefinition["video_url"]) {
        return queryInterface.addColumn("course", "video_url", {
          type: Sequelize.STRING(200),
          allowNull: true,
          defaultValue: null,
        });
      } else {
        return Promise.resolve(true);
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("course").then((tableDefinition) => {
      if (tableDefinition["video_url"]) {
        return queryInterface.removeColumn("course", "video_url");
      } else {
        return Promise.resolve(true);
      }
    });
  },
};
