"use strict";
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
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
      title: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    { tableName: "section", timestamps: false }
  );

  Section.associate = function (models) {
    Section.belongsTo(models.Course, { as: "course" });
    Section.hasMany(models.Lecture, {
      as: "lectures",
      foreignKey: "sectionId",
    });
  };

  return Section;
};
