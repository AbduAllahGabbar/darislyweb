"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("course", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectId: {
        field: "subject_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        references: {
          model: "subject",
          key: "id",
        },
      },
      tutorId: {
        field: "tutor_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "tutor",
          key: "id",
        },
      },
      type: {
        type: "TINYINT(4)",
        allowNull: false,
      },
      education: {
        type: Sequelize.INTEGER(2).UNSIGNED,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER(2).UNSIGNED,
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
    return queryInterface.dropTable("course");
  },
};
