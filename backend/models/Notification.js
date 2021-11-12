"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      studentId: {
        field: "student_id",
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "student",
          key: "id",
        },
      },
      read: {
        field: "read",
        allowNull: false,
        default: false,
        type: DataTypes.TINYINT(4),
      },
      type: {
        field: "type",
        allowNull: false,
        type: DataTypes.TINYINT(4),
      },
      content: {
        type: "JSON",
        allowNull: true,
      },
    },
    {
      tableName: "notification",
      timestamps: true,
      updatedAt: false,
    }
  );
  Notification.associate = function (models) {
    Notification.belongsTo(models.Student, { as: "student" });
  };
  return Notification;
};
