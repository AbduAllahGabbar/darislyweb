"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
      },
      name: { type: "JSON", allowNull: false },
    },
    {
      tableName: "city",
      timestamps: false,
    }
  );

  City.associate = function (models) {
    City.hasMany(models.CourseGroup, {
      as: "courseGroups",
      foreignKey: "cityId",
    });
    City.hasMany(models.Area, { as: "areas", foreignKey: "cityId" });
    City.hasMany(models.Student, { as: "students", foreignKey: "cityId" });
  };

  return City;
};
