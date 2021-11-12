"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("staff", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      lastName: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: "BINARY(60)",
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("staff");
  },
};
