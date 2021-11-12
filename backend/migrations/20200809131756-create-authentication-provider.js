"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("authentication_provider", {
      id: {
        type: Sequelize.STRING(128),
        allowNull: false,
        primaryKey: true,
      },
      studentId: {
        field: "student_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "student",
          key: "id",
        },
      },
      type: {
        allowNull: false,
        type: "TINYINT(4)",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("authentication_provider");
  },
};
