"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("staff_center", {
      staffId: {
        field: "staff_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "staff",
          key: "id",
        },
      },
      centerId: {
        field: "center_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "center",
          key: "id",
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("staff_center");
  },
};
