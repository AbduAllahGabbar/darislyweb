"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("course_group_session_schedule", {
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
      from: {
        field: "from",
        allowNull: false,
        type: Sequelize.DATE,
      },
      to: {
        field: "to",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("course_group_session_schedule", {
      fields: ["student_id", "course_group_session_id"],
      type: "primary key",
      name: "course_group_session_schedule_ibpk",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course_group_session_schedule");
  },
};
