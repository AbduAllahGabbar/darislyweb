"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("credit_card", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      cardToken: {
        field: "card_token",
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      cardPassword: {
        field: "card_password",
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      subtype: {
        type: "TINYINT(4)",
        allowNull: true,
      },
      maskedPan: {
        field: "masked_pan",
        type: "CHAR(4)",
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("credit_card");
  },
};
