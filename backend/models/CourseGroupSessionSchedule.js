"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseGroupSessionSchedule = sequelize.define(
    "CourseGroupSessionSchedule",
    {
      studentId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      courseGroupSessionId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      from: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      to: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "course_group_session_schedule",
      timestamps: false,
    }
  );
  CourseGroupSessionSchedule.associate = function (models) {
    CourseGroupSessionSchedule.belongsTo(models.Student, { as: "student" });
    CourseGroupSessionSchedule.belongsTo(models.CourseGroupSession, {
      as: "courseGroupSession",
    });
  };
  return CourseGroupSessionSchedule;
};
