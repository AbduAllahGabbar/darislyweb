"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable("quiz");

    if (!tableDefinition["name"]) {
      await queryInterface.addColumn("quiz", "name", Sequelize.STRING);
      await queryInterface.bulkUpdate("quiz", { name: "Quiz" });
      await queryInterface.changeColumn("quiz", "name", {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("quiz", "name");
  },
};
