"use strict";
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define(
    "CreditCard",
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
      cardToken: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      cardPassword: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      subtype: {
        type: "TINYINT(4)",
        allowNull: true,
      },
      maskedPan: {
        type: "CHAR(4)",
        allowNull: true,
      },
      orderId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      verified: {
        type: "TINYINT(4)",
        allowNull: true,
        defaultValue: "0",
      },
    },
    {
      tableName: "credit_card",
      timestamps: true,
      updatedAt: false,
    }
  );
  CreditCard.associate = function (models) {
    CreditCard.belongsTo(models.Student, { as: "student" });
  };
  return CreditCard;
};
