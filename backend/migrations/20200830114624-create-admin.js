"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("admin", {
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
        field: "first_name",
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      lastName: {
        field: "last_name",
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
    return queryInterface.dropTable("admin");
  },
};
