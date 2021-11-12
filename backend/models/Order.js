"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      status: {
        type: "TINYINT(4)",
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: "TINYINT(4)",
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: "DOUBLE",
        allowNull: false,
        defaultValue: 0.0,
      },
      expiresIn: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      centerId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      fawryReferenceNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "order",
      timestamps: true,
      updatedAt: false,
    }
  );
  Order.associate = function (models) {
    Order.belongsTo(models.Student, { as: "student", foreignKey: "studentId" });
    Order.belongsTo(models.Center, { as: "center", foreignKey: "centerId" });
    Order.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: "orderId",
    });
  };
  return Order;
};
