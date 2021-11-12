"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("order_item", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        field: "order_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "order",
          key: "id",
        },
      },
      courseGroupSessionId: {
        field: "course_group_session_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
        references: {
          model: "course_group_session",
          key: "id",
        },
      },
      price: {
        type: "DOUBLE",
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("order_item");
  },
};
