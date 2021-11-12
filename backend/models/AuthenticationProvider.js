"use strict";
module.exports = (sequelize, DataTypes) => {
  const AuthenticationProvider = sequelize.define(
    "AuthenticationProvider",
    {
      id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true,
      },
      studentId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      type: {
        allowNull: false,
        type: "TINYINT(4)",
      },
    },
    {
      tableName: "authentication_provider",
      timestamps: false,
    }
  );
  AuthenticationProvider.associate = function (models) {
    AuthenticationProvider.belongsTo(models.Student, {
      as: "student",
    });
  };
  return AuthenticationProvider;
};
