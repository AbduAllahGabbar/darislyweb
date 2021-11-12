"use strict";
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
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
      attended: {
        type: "TINYINT(4)",
        allowNull: true,
      },
      type: {
        type: "TINYINT(4)",
        allowNull: true,
      },
    },
    {
      tableName: "attendance",
      timestamps: false,
    }
  );
  Attendance.associate = function (models) {
    Attendance.belongsTo(models.Student, { as: "student" });
    Attendance.belongsTo(models.CourseGroupSession, {
      as: "courseGroupSession",
    });
  };
  return Attendance;
};
