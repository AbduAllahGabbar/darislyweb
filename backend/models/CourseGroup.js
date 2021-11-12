"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseGroup = sequelize.define(
    "CourseGroup",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      centerId: {
        allowNull: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      areaId: {
        allowNull: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      cityId: {
        allowNull: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      weekDays: {
        allowNull: true,
        type: "JSON",
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      capacity: { type: DataTypes.INTEGER(3), allowNull: true },
      type: {
        type: "TINYINT(4)",
        allowNull: false,
      },
    },
    {
      tableName: "course_group",
      timestamps: false,
    }
  );
  CourseGroup.associate = function (models) {
    CourseGroup.belongsTo(models.Course, { as: "course" });
    CourseGroup.belongsTo(models.Area, { as: "area" });
    CourseGroup.belongsTo(models.City, { as: "city" });
    CourseGroup.belongsTo(models.Center, {
      as: "center",
      foreignKey: "centerId",
    });
    CourseGroup.hasMany(models.CourseGroupSession, {
      as: "courseGroupSessions",
      foreignKey: "courseGroupId",
    });
  };
  return CourseGroup;
};
