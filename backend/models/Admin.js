"use strict";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      password: {
        type: "BINARY(60)",
        allowNull: false,
      },
    },
    {
      tableName: "admin",
      timestamps: false,
    }
  );
  Admin.associate = function (models) {};

  return Admin;
};
