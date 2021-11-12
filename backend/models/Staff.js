"use strict";
module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
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
      resetPasswordToken: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "staff",
      timestamps: false,
    }
  );
  Staff.associate = function (models) {
    Staff.hasMany(models.StaffCenter, {
      as: "staffCenters",
      foreignKey: "staffId",
    });
  };
  return Staff;
};
