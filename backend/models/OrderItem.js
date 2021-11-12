"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      courseGroupSessionId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      price: {
        type: "DOUBLE",
        allowNull: false,
      },
      type: {
        type: "TINYINT(4)",
        allowNull: true,
      },
    },
    {
      tableName: "order_item",
      timestamps: false,
    }
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, { as: "order" });
    OrderItem.belongsTo(models.CourseGroupSession, {
      as: "courseGroupSession",
    });
  };
  return OrderItem;
};
