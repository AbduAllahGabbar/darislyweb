"use strict";
module.exports = (sequelize, DataTypes) => {
  const LastVerificationTime = sequelize.define(
    "LastVerificationTime",
    {
      studentId: {
        field: "student_id",
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
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
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      lastPhoneVerification: {
        field: "last_phone_verification",
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    { tableName: "last_verification_time", timestamps: false }
  );
  LastVerificationTime.associate = function (models) {
    LastVerificationTime.belongsTo(models.Student);
  };
  return LastVerificationTime;
};
