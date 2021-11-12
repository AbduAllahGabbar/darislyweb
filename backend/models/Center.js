"use strict";
module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define(
    "Center",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      name: { type: "JSON", allowNull: false },
      address: { type: "JSON", allowNull: false },
      longitude: {
        type: "FLOAT(10,7)",
        allowNull: true,
      },
      latitude: {
        type: "FLOAT(10,7)",
        allowNull: true,
      },
    },
    {
      tableName: "center",
      timestamps: false,
    }
  );
  Center.associate = function (models) {
    Center.hasMany(models.CourseGroup, {
      as: "courseGroups",
      foreignKey: "centerId",
    });
    Center.hasMany(models.StaffCenter, {
      as: "staffCenters",
      foreignKey: "centerId",
    });
  };
  return Center;
};
