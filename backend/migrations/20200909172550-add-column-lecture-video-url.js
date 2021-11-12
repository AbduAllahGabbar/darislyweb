"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("lecture").then((tableDefinition) => {
      if (!tableDefinition["video_url"]) {
        return queryInterface.addColumn("lecture", "video_url", {
          type: "VARBINARY(255)",
          allowNull: true,
          defaultValue: null,
        });
      } else {
        return Promise.resolve(true);
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.describeTable("lecture").then((tableDefinition) => {
      if (tableDefinition["video_url"]) {
        return queryInterface.removeColumn("lecture", "video_url");
      } else {
        return Promise.resolve(true);
      }
    });
  },
};
