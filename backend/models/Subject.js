"use strict";
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
      },
      name: { type: "JSON", allowNull: false },
    },
    { tableName: "subject", timestamps: false }
  );

  Subject.associate = function (models) {
    Subject.hasMany(models.Course, { as: "courses", foreignKey: "subjectId" });
  };

  return Subject;
};
