"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseGroupSession = sequelize.define(
    "CourseGroupSession",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      courseGroupId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      lectureId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      from: {
        type: "TIME",
        allowNull: true,
      },
      to: {
        type: "TIME",
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      productId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
    },
    { tableName: "course_group_session", timestamps: false }
  );
  CourseGroupSession.associate = function (models) {
    CourseGroupSession.belongsTo(models.CourseGroup, { as: "courseGroup" });
    CourseGroupSession.belongsTo(models.Lecture, { as: "lecture" });
    CourseGroupSession.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: "courseGroupSessionId",
    });
    CourseGroupSession.hasMany(models.Attendance, {
      as: "attendances",
      foreignKey: "courseGroupSessionId",
    });
    CourseGroupSession.hasMany(models.CourseGroupSessionSchedule, {
      as: "courseGroupSessionSchedules",
      foreignKey: "courseGroupSessionId",
    });
    CourseGroupSession.hasOne(models.LiveSession, {
      as: "liveSession",
      foreignKey: "courseGroupSessionId",
    });
    CourseGroupSession.belongsTo(models.Product, { as: "product" });
  };
  return CourseGroupSession;
};
