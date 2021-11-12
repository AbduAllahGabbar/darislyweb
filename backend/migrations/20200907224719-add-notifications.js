"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("notification", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
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
      read: {
        field: "read",
        allowNull: false,
        default: false,
        type: Sequelize.TINYINT(4),
      },
      type: {
        field: "type",
        allowNull: false,
        type: Sequelize.TINYINT(4),
      },
      content: {
        type: "JSON",
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("notification");
  },
};
