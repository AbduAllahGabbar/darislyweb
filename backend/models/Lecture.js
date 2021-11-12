"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    "Lecture",
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
      sectionId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      title: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      price: {
        type: "DOUBLE",
        allowNull: false,
      },
      videoUrl: {
        type: "VARBINARY(255)",
        allowNull: true,
      },
    },
    {
      tableName: "lecture",
      timestamps: false,
    }
  );

  Lecture.associate = function (models) {
    Lecture.belongsTo(models.Course, { as: "course" });
    Lecture.belongsTo(models.Section, { as: "section" });
    Lecture.hasOne(models.CourseGroupSession, {
      as: "courseGroupSession",
      foreignKey: "lectureId",
    });
    Lecture.hasOne(models.Quiz, { as: "quiz", foreignKey: "lectureId" });
    Lecture.hasMany(models.Material, {
      as: "material",
      foreignKey: "lectureId",
    });
  };

  return Lecture;
};
