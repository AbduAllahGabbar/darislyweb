"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tutor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      firstName: {
        field: "first_name",
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastName: {
        field: "last_name",
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      countryCode: {
        field: "country_code",
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      country: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      password: {
        type: "BINARY(60)",
        allowNull: false,
      },
      hasImage: {
        field: "has_image",
        type: "TINYINT(4)",
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tutor");
  },
};
