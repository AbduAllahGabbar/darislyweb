"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("center", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      name: { type: "JSON", allowNull: false },
      address: { type: "JSON", allowNull: false },
      longitude: {
        type: "FLOAT(10,7)",
        allowNull: true,
        defaultValue: null
      },
      latitude: {
        type: "FLOAT(10,7)",
        allowNull: true,
        defaultValue: null
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("center");
  },
};
