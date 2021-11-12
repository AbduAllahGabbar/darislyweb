"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("course_group", "center_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "center",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("course_group", "center_id");
  },
};
