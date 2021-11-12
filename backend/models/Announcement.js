"use strict";
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
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
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      tableName: "announcement",
      timestamps: true,
      updatedAt: false,
    }
  );
  Announcement.associate = function (models) {
    Announcement.belongsTo(models.Course, { as: "course" });
  };
  return Announcement;
};
