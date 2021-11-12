"use strict";

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    "Area",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
      },
      name: { type: "JSON", allowNull: false },
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
    },
    {
      tableName: "area",
      timestamps: false,
    }
  );

  Area.associate = function (models) {
    Area.hasMany(models.CourseGroup, {
      as: "courseGroup",
      foreignKey: "areaId",
    });
    Area.belongsTo(models.City, { as: "city", foreignKey: "cityId" });
    Area.hasMany(models.Student, { as: "students", foreignKey: "areaId" });
  };

  return Area;
};
