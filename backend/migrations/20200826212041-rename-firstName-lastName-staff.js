"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("staff", "firstName", "first_name");
    await queryInterface.renameColumn("staff", "lastName", "last_name");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("staff", "first_name", "firstName");
    await queryInterface.renameColumn("staff", "last_name", "lastName");
  },
};
