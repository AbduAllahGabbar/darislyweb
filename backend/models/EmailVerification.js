"use strict";
module.exports = (sequelize, DataTypes) => {
  const EmailVerification = sequelize.define(
    "EmailVerification",
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
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "email_verification", timestamps: true, updatedAt: false }
  );
  EmailVerification.associate = function (models) {
    EmailVerification.belongsTo(models.Student);
  };
  return EmailVerification;
};
