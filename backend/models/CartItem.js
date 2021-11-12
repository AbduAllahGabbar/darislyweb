"use strict";

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
    },
    {
      tableName: "cart_item",
      timestamps: false,
    }
  );

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Product, { as: "product" });
    CartItem.belongsTo(models.Student, { as: "student" });
  };

  return CartItem;
};
