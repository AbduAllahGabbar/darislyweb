"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: "TINYINT(4)",
        allowNull: false,
      },
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );

  Product.associate = function (models) {
    Product.hasOne(models.CourseGroupSession, {
      as: "courseGroupSession",
      foreignKey: "productId",
    });
    Product.hasMany(models.CartItem, {
      foreignKey: "productId",
      as: "cartItems",
    });
  };

  return Product;
};
