"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("live_session", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      meetingId: {
        field: "meeting_id",
        type: "VARBINARY(60)",
        allowNull: false,
      },
      meetingPassword: {
        field: "meeting_password",
        type: "VARBINARY(60)",
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      from: {
        type: "TIME",
        allowNull: true,
        defaultValue: null,
      },
      to: {
        type: "TIME",
        allowNull: true,
        defaultValue: null,
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
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("live_session");
  },
};
