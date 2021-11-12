"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("lecture", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        field: "course_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "course",
          key: "id",
        },
      },
      sectionId: {
        field: "section_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "section",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      },
      price: {
        type: "DOUBLE",
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("lecture");
  },
};
