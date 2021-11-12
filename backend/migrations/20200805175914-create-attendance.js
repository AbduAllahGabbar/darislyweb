"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("attendance", {
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
      courseGroupSessionId: {
        field: "course_group_session_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "course_group_session",
          key: "id",
        },
      },
      attended: {
        type: "TINYINT(4)",
        allowNull: true,
        defaultValue: 0,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("attendance");
  },
};
