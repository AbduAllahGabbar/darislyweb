"use strict";

// TODO add course name?

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      tutorId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      education: {
        type: DataTypes.INTEGER(2).UNSIGNED,
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER(2).UNSIGNED,
        allowNull: false,
      },
      hasImage: {
        type: "TINYINT(4)",
        allowNull: true,
      },
      description: {
        type: "STRING(1000)",
        allowNull: false,
      },
      videoUrl: { type: DataTypes.STRING(200), allowNull: true },
    },
    {
      tableName: "course",
      timestamps: true,
      updatedAt: false,
    }
  );

  Course.associate = function (models) {
    Course.belongsTo(models.Subject, { as: "subject" });
    Course.belongsTo(models.Tutor, { as: "tutor", foreignKey: "tutorId" });
    Course.hasMany(models.CourseGroup, {
      as: "courseGroups",
      foreignKey: "courseId",
    });
    Course.hasMany(models.Section, { as: "sections", foreignKey: "courseId" });
    Course.hasMany(models.Lecture, { as: "lectures", foreignKey: "courseId" });
    Course.hasMany(models.Announcement, {
      as: "announcements",
      foreignKey: "courseId",
    });
  };

  return Course;
};
