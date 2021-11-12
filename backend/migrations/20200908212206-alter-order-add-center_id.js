"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("order", "center_id", {
      type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
      references: {
        model: "center",
        key: "id",
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("order", "center_id");
  },
};
