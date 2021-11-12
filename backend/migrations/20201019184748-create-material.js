"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("material", {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      lectureId: {
        field: "lecture_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "lecture",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
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
    await queryInterface.dropTable("material");
  },
};
