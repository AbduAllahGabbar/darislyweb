"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cart_item", {
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
      productId: {
        field: "product_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "product",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cart_item");
  },
};
