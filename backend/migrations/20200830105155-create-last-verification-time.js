"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("last_verification_time", {
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
        primaryKey: true,
      },
      lastEmailVerification: {
        field: "last_email_verification",
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      lastPhoneVerification: {
        field: "last_phone_verification",
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course");
  },
};
